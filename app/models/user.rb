class User < ActiveRecord::Base
  attr_accessible :password, :session_token, :username
  attr_reader :password

  before_validation :ensure_session_token

  validates :session_token, :username, :password_digest, :presence => true
  validates :password, :length => { :minimum => 6, :allow_nil => true }

  has_many :debtors, :through => :credits, :uniq => true
  has_many :creditors, :through => :debts, :uniq => true

  has_many(
    :debts,
    :foreign_key => :debtor_id,
    :class_name => "Loan"
  )

  has_many(
    :credits,
    :foreign_key => :creditor_id,
    :class_name => "Loan"
  )

  has_many(
    :paid_transactions,
    :through => :credits,
    :source => :transaction
  )

  has_many(
    :sponsored_transactions,
    :through => :debts,
    :source => :transaction
  )

  has_many(
    :source_friendships,
    :foreign_key => :source_friend_id,
    :class_name => "Friendship",
    :uniq => true
  )
  
  has_many(
    :target_friendships,
    :foreign_key => :target_friend_id,
    :class_name => "Friendship",
    :uniq => true
  )

  has_many(
    :source_friends,
    :through => :source_friendships,
    :source => :target_friend,
    :uniq => true
  )

  has_many(
    :target_friends,
    :through => :target_friendships,
    :source => :source_friend,
    :uniq => true
  )

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    if user && user.is_password?(password)
      return user
    else
      puts "incorrect credentials"
    end
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
   @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def balance_with_other_user(other_user)
    credit_with_other_user(other_user) - debt_with_other_user(other_user)
  end

  def credit_with_other_user(other_user)
    credits = self.credits.select { |credit| credit.debtor_id == other_user.id }
    sum = 0
    credits.each { |credit| sum += credit.amount }
    sum
  end

  def debt_with_other_user(other_user)
    debts = self.debts.select { |debt| debt.creditor_id == other_user.id }
    sum = 0
    debts.each { |debt| sum += debt.amount }
    sum
  end

  def friends
    (target_friends + source_friends).uniq
  end

  def transactions
    paid_transactions + sponsored_transactions
  end

  def unpaid_creditors
    unpaid_creditors = []
    creditors.each do |creditor|
      if balance_with_other_user(creditor) < 0
        unpaid_creditors << creditor
      end
    end
    unpaid_creditors
  end

  def unpaid_debtors
    unpaid_debtors = []
    debtors.each do |debtor|
      if balance_with_other_user(debtor) > 0
        unpaid_debtors << debtor
      end
    end
    unpaid_debtors
  end

  def total_owed_by_other_users
    total_credit = 0
    unpaid_debtors.each do |debtor|
      total_credit += balance_with_other_user(debtor)
    end
    total_credit
  end

  def total_owed_to_other_users
    total_debt = 0
    unpaid_creditors.each do |creditor|
      total_debt += balance_with_other_user(creditor)
    end
    total_debt
  end

end
