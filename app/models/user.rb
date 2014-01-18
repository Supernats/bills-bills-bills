class User < ActiveRecord::Base
  attr_accessible :password, :session_token, :username
  attr_reader :password

  before_validation :ensure_session_token

  validates :session_token, :username, :password_digest, :presence => true
  validates :password, :length => { :minimum => 6, :allow_nil => true }

  has_many :debtors, :through => :credits
  has_many :creditors, :through => :debts

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
    credits = self.credits.where(:debtor_id => other_user.id)
    sum = 0
    credits.each { |credit| sum += credit.amount }
    sum
  end

  def debt_with_other_user(other_user)
    debts = self.debts.where(:creditor_id => other_user.id)
    sum = 0
    debts.each { |debt| sum += debt.amount }
    sum
  end

  def transactions
    paid_transactions + sponsored_transactions
  end

  # these totals feel shaky
  def negative_balances
    negative_balances = []
    creditors.each do |creditor|
      negative_balances << creditor if balance_with_other(creditor) < 0
    end
  end

  def positive_balances
    positive_balances = []
    debtors.each do |debtor|
      positive_balance << debtor if balance_with_other(debtor) < 0
    end
  end

end
