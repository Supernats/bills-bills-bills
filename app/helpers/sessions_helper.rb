module SessionsHelper

  def current_user
    @current_user = User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def login_user!(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def require_current_user!
    redirect_to new_session_url unless logged_in?
  end

  def require_no_current_user!
    redirect_to root_url if logged_in?
  end

end
