class Api::UsersController < ApplicationController
  def show
    @user = User.includes(
      :debts,
      :credits,
      :debtors,
      :creditors,
      :paid_transactions,
      :sponsored_transactions,
      :target_friends,
      :source_friends
    ).find(params[:id])
  end

  def index
    @users = User.all
  end

  def create
    if !params[:user][:password]
      @user = UnregisteredUser.new(params[:user])
    end
    if @user.save
      puts "Saved unregistered user"
      render :json => @user
    else
      render :json => @user.errors
    end
  end
end
