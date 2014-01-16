class Loan < ActiveRecord::Base
  attr_accessible :amount, :creditor_id, :debtor_id, :transaction_id

  belongs_to(
    :creditor,
    :class_name: "User"
  )

  belongs_to(
    :debtor,
    :class_name: "User"
  )

  belongs_to :transaction
end
