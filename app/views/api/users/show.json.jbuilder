json.(@user, :id, :username, )
# json.transactions @user.transactions do |transaction|
#   json.(
#     transaction,
#     :id,
#     :description,
#     :date
#   )
# end

json.debts @user.debts do |debt|
  json.(
    debt,
    :id,
    self.transaction.description,
    :creditor_id,
    :amount,
    self.transaction.date
  )
end

json.credits @user.credit do |credit|
  json.(
    credit,
    :id,
    self.transaction.description,
    :debtor_id,
    :amount,
    self.transaction.date
  )
end
