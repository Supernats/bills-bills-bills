class Api::TransactionsController < ApplicationController
  def new
    @transaction = Transaction.new
  end

  def index
    @transactions = current_user.transactions
    render :json => @transactions
  end

  def create
    @transaction = Transaction.new(params[:transaction])
    if @transaction.save
      render :json => @transaction
    else
      render :json => @transaction.errors, :status => 422
    end
  end

  def show
    @transaction = Transaction.find(params[:id])
  end
end
