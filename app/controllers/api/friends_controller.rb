class Api::FriendsController < ApplicationController
  # index returns User objects that are friends with the user
  # create creates an entry in the Friendships join table.
  # it's not great, but it's gonna have to work for now
  def index
    @friends = current_user.friends
    render :json => @friends
  end

  def create
    @friend = Friendship.new(params[:friend]);
    if @friend.save
      render :json => @friend
    else
      render :json => @friend.errors, :status => 422
    end
  end

end
