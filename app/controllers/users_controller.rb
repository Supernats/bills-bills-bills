class UsersController < ApplicationController
  def index
    @users = User.all
    render @users
  end
  
  def new
    @user = User.new
  end
  
end
