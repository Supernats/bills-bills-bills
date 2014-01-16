class User < ActiveRecord::Base
  attr_accessible :password, :session_token, :username
  before_validation :ensure_session_token
  validates :session_token, :username, :password_digest, :presence => true
  validates :password, :length => { :minimum => 6, :allow_nil => true }

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
    self.password_digest = BCrypt::Password.create(password)
  end


  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end
end
