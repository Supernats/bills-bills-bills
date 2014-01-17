json.(@user, :id, :username, )
json.transactions @user.transactions do |transaction|
  json.(transaction, :id, :description, :date)
end
json.loans
