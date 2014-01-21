# Create users
nathan = User.create(:username => "Nathan", :password => "password")
david = User.create(:username => "David", :password => "password")
rory = User.create(:username => "Rory", :password => "password")
john = User.create(:username => "John", :password => "password")
ned = User.create(:username => "Ned", :password => "password")

# Create transaaction objects
nathan_rory_john = Transaction.create(
  :description => "Nathan paid for Rory and John: 20+10=30",
  :total => 30
)
david_john_nathan = Transaction.create(
  :description => "David paid for John and Nathan: 30+10=40",
  :total => 40
)
david_rory = Transaction.create(
  :description => "David paid for Rory: 15=15",
  :total => 15
)
john_david = Transaction.create(
  :description => "John paid for David: 25=25",
  :total => 25
)
nathan_david = Transaction.create(
  :description => "Nathan paid for David: 100=100",
  :total => 100
)
nathan_rory = Transaction.create(
  :description => "Nathan paid for Rory: 30=30",
  :total => 30
)

# Create loans for transaction
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
  :debtor_id => john.id,
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

# Seed Friendships
Friendship.create(
  :target_friend_id => nathan.id,
  :source_friend_id => david.id
)

Friendship.create(
  :target_friend_id => nathan.id,
  :source_friend_id => john.id
)

Friendship.create(
  :target_friend_id => nathan.id,
  :source_friend_id => ned.id
)

Friendship.create(
  :target_friend_id => rory.id,
  :source_friend_id => david.id
)

Friendship.create(
  :target_friend_id => john.id,
  :source_friend_id => david.id
)

Friendship.create(
  :target_friend_id => rory.id,
  :source_friend_id => ned.id
)

Friendship.create(
  :target_friend_id => david.id,
  :source_friend_id => ned.id
)
