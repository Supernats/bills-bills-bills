# Create users
nathan = RegisteredUser.create(
  :email => "nathan@paytoma.com",
  :username => "Nathan",
  :password => "password"
)
david = RegisteredUser.create(
  :email => "david@paytoma.com",
  :username => "David",
  :password => "password"
)
rory = RegisteredUser.create(
  :email => "rory@paytoma.com",
  :username => "Rory",
  :password => "password"
)
john = RegisteredUser.create(
  :email => "john@paytoma.com",
  :username => "John",
  :password => "password"
)
ned = RegisteredUser.create(
  :email => "ned@paytoma.com",
  :username => "Ned",
  :password => "password"
)

cj = UnregisteredUser.create(
  :email => "cj@paytoma.com"
)

jeff = UnregisteredUser.create(
  :email => "jeff@paytoma.com"
)

ryan = UnregisteredUser.create(
  :email => "ryan@paytoma.com"
)

flarnie = UnregisteredUser.create(
  :email => "flarnie@paytoma.com"
)

guest = RegisteredUser.create(
  :email => "paul@paytoma.com",
  :username => "Kwisatz Haderach",
  :password => "I_must_n0t_fear"
)
