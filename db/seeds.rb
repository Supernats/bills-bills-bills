# Create users
nathan = RegisteredUser.create(
  :email => "nathan@billapp.com",
  :username => "Nathan",
  :password => "password"
)
david = RegisteredUser.create(
  :email => "david@billapp.com",
  :username => "David",
  :password => "password"
)
rory = RegisteredUser.create(
  :email => "rory@billapp.com",
  :username => "Rory",
  :password => "password"
)
john = RegisteredUser.create(
  :email => "john@billapp.com",
  :username => "John",
  :password => "password"
)
ned = RegisteredUser.create(
  :email => "ned@billapp.com",
  :username => "Ned",
  :password => "password"
)

cj = UnregisteredUser.create(
  :email => "cj@billapp.com"
)

jeff = UnregisteredUser.create(
  :email => "jeff@billapp.com"
)

ryan = UnregisteredUser.create(
  :email => "ryan@billapp.com"
)

flarnie = UnregisteredUser.create(
  :email => "flarnie@billapp.com"
)
# Create transaaction objects
nathan_rory_john = Transaction.create(
  :description => "Nathan paid for Rory and John: 20+20+10=50",
  :total => 50
)
david_john_nathan = Transaction.create(
  :description => "David paid for John and Nathan: 20+30+10=60",
  :total => 60
)
david_rory = Transaction.create(
  :description => "David paid for Rory: 10+15=25",
  :total => 25
)
john_david = Transaction.create(
  :description => "John paid for David: 20+25=45",
  :total => 45
)
nathan_david = Transaction.create(
  :description => "Nathan paid for David: 50+100=150",
  :total => 150
)
nathan_rory = Transaction.create(
  :description => "Nathan paid for Rory: 60+30=90",
  :total => 90
)

cj_nathan = Transaction.create(
  :description => "CJ paid for Nathan: 10+25=35",
  :total => 35
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

# Transaction 7: CJ => Nathan
Loan.create(
  :transaction_id => cj_nathan.id,
  :creditor_id => cj.id,
  :debtor_id => nathan.id,
  :amount => 25
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

Friendship.create(
  :target_friend_id => cj.id,
  :source_friend_id => nathan.id
)
