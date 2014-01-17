class RootController < ApplicationController
  before_filter :require_current_user!
  def root
    # start up the backbone side of things, for now, just redirect with notice
    flash[:notices] = "Redirected from root#root"
    redirect_to users_url
  end
end
