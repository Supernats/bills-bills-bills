class RegisteredUser < User
  before_validation :ensure_session_token

  validates :session_token, :username, :password_digest, :presence => true
  validates :password, :length => { :minimum => 6, :allow_nil => true }

end
