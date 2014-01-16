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
    if user.is_password?(password)
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

  def get_balance_with_other_user(user_id)
    other_user = User.find(user_id)
  end

  def total_balance
    self.total_credit - self.total_debt
  end

  def total_credit
    total = 0
    self.credits.each do |credit|
      total += credit.amount
    end
    total
  end

  def total_debt
    total = 0
    self.debts.each do |debt|
      total += debt.amount
    end
    total
  end

end
