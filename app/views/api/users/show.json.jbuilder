json.(
  @user,
  :id,
  :username,
  :total_owed_to_other_users,
  :total_owed_by_other_users
)

json.friends @user.friends do |friend|
  json.id friend.id
  json.email friend.email
  json.username friend.username
  json.balance @user.balance_with_other_user(friend)
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
    :description,
    :date
  )
end

json.credits @user.credits do |credit|
  json.(
    credit,
    :id,
    :transaction_id,
    :debtor_id,
    :amount,
    :description,
    :date
  )
end
