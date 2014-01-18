class Api::UsersController < ApplicationController
  def show
    @user = User.includes(
      :debts,
      :credits,
      :debtors,
      :creditors,
      :paid_transactions,
      :sponsored_transactions
    ).find(params[:id])

  end
end
