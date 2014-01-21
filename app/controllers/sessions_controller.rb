class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    username, password = params[:user][:username], params[:user][:password]
    @user = User.find_by_credentials(username, password)
    if @user
      login_user!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = "Incorrect credentials"
      render new
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end
end
