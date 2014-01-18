class Api::CreditsController < ApplicationController
  def index
    @credits = current_user.credits
  end
end
