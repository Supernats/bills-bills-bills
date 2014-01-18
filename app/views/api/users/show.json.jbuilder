json.(@user, :id, :username, :total_owed_to_other_users, :total_owed_by_other_users)

json.unpaid_creditors @user.unpaid_creditors do |creditor|
  json.id creditor.id
  json.username creditor.username
  json.debt @user.balance_with_other_user(creditor)
end

json.unpaid_debtors @user.unpaid_debtors do |debtor|
  json.id debtor.id
  json.username debtor.username
  json.credit @user.balance_with_other_user(debtor)
end

json.transactions @user.transactions do |transaction|
  json.(
    transaction,
    :id,
    :date,
    :description
  )
end

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
    :transaction_id,
    :debtor_id,
    :amount,
    :description
  )
end
