# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
nathan = User.create(:username => "Nathan", :password => "password")
david = User.create(:username => "David", :password => "password")
rory = User.create(:username => "Rory", :password => "password")
john = User.create(:username => "John", :password => "password")

nathan_rory_john = Transaction.create(:description => "Nathan paid for Rory and John: 20+10=30")
david_john_nathan = Transaction.create(:descritption => "David paid for John and Nathan: 30+10=60")
david_rory = Transaction.create(:description => "David paid for Rory: 15=15")
john_david = Transaction.create(:description => "John paid for David: 25=25")
nathan_david = Transaction.create(:description => "Nathan paid for David: 100=100")
nathan_rory = Transaction.create(:desctiption => "Nathan paid for Rory: 30=30")

# Transaction 1: Nathan => Rory and John
Loan.create(
  :transaction_id => nathan_rory_john.id,
  :creditor_id => nathan.id,
  :debtor_id => rory.id,
  :amount => 20
)
Loan.create(
  :transaction_id => nathan_rory_john.id,
  :creditor_id => nathan.id,
  :debtor_id, john.id,
  :amount => 10
)

# Transaction 2: David => John and Nathan
Loan.create(
  :transaction_id => david_john_nathan.id,
  :creditor_id => david.id,
  :debtor_id => john.id,
  :amount => 30
)

Loan.create(
  :transaction_id => david_john_nathan.id,
  :creditor_id => david.id,
  :debtor_id => nathan.id,
  :amount => 10
)

# Transaction 3: David => Rory
Loan.create(
  :transaction_id => david_rory.id,
  :creditor_id => david.id,
  :debtor_id => rory.id,
  :amount => 15
)

# Transaction 4: John => David
Loan.create(
  :transaction_id => john_david.id,
  :creditor_id => john.id,
  :debtor_id => david.id,
  :amount => 25
)

# Transaction 5: Nathan => David
Loan.create(
  :transaction_id => nathan_david.id,
  :creditor_id => nathan.id,
  :debtor_id => david.id,
  :amount => 100
)

# Transaction 6: Nathan => Rory
Loan.create(
  :transaction_id => nathan_rory.id,
  :creditor_id => nathan.id,
  :debtor_id => rory.id,
  :amount => 30
)
