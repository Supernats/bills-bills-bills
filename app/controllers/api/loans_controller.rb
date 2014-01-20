class Api::LoansController < ApplicationController
  def new
    @loan = Loan.new
  end

  def create
    @loan = Loan.new(params[:loan])
    if @loan.save!
      render :show
    else
      render :json => @loan.errors, :status => 422
    end
  end

  def show
    @loan = Loan.find(params[:id])
  end
end
