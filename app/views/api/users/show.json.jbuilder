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
    :transaction_id,
    :creditor_id,
    :amount,
    :description
  )
end

json.credits @user.credits do |credit|
  json.(
    credit,
    :id,
    :transaction,
    :debtor_id,
    :amount,
    :transaction
  )
end
