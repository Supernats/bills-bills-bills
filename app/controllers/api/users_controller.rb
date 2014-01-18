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
end
