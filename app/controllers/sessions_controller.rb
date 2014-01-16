class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    username, plaintext = params[:user][:username], params[:user][:plaintext]
    @user = User.find_by_credentials(username, plaintext)
    if @user
      login_user!(@user)
      redirect_to users_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render new
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end
end
