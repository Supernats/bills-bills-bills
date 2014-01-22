class UsersController < ApplicationController

  def index
    @users = User.all
  end
  
  def new
    @user = User.new
  end

  def create
    @user = User.find_by_email(params[:user][:email])
    if @user
      @user.type = 'RegisteredUser'
      if @user.update_attributes(params[:user])
        login_user!(@user)
        redirect_to root_url
      else
        flash.now[:errors] = @user.errors.full_messages
        render :new
      end
    else
      @user = User.new(params[:user])
      if @user.save
        login_user!(@user)
        redirect_to root_url
      else
        flash.now[:errors] = @user.errors.full_messages
        render :new
      end
    end
  end

  def show
    @user = User.includes(:debts, :credits).find(params[:id])
  end

  def edit
    @user = current_user
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(params[:user])
      flash.now[:notices] = "Your info has been updated"
      redirect_to user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :edit
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    redirect_to root_url
  end
  
end
