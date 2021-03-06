class SessionsController < ApplicationController
  before_filter :require_no_current_user!, :only => [:new, :create]
  def new
    @user = User.new
    render :new
  end

  def create
    email, password = params[:user][:email], params[:user][:password]
    @user = User.find_by_credentials(email, password)
    if @user
      login_user!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = "Incorrect credentials"
      render :new
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end
end
