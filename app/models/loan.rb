class Loan < ActiveRecord::Base
  attr_accessible :amount, :creditor_id, :debtor_id, :transaction_id

  validates :creditor, :debtor, :transaction, :amount, :presence => true

  belongs_to(
    :creditor,
    :class_name => "User"
  )

  belongs_to(
    :debtor,
    :class_name => "User"
  )

  belongs_to :transaction

  def date
    self.transaction.date
  end

  def description
    self.transaction.description
  end

end
