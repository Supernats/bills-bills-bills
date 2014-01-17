class Api::TransactionsController < ApplicationController
  def new
    @transaction = Transaction.new
  end

  def index
    @transactions = current_user.transactions
  end

  def create
    @transaction = Transaction.new(params[:transaction])
    if @transaction.save
      render :show
    else
      render :json => @gist.errors, :status => 422
    end
  end

  def show
    @transaction = Transaction.find(params[:id])
  end
end
