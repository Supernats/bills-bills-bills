# Create users
nathan = RegisteredUser.create(
  :email => "nathan@splittr.com",
  :username => "Nathan",
  :password => "password"
)
david = RegisteredUser.create(
  :email => "david@splittr.com",
  :username => "David",
  :password => "password"
)
rory = RegisteredUser.create(
  :email => "rory@splittr.com",
  :username => "Rory",
  :password => "password"
)
john = RegisteredUser.create(
  :email => "john@splittr.com",
  :username => "John",
  :password => "password"
)
ned = RegisteredUser.create(
  :email => "ned@splittr.com",
  :username => "Ned",
  :password => "password"
)

cj = UnregisteredUser.create(
  :email => "cj@splittr.com"
)

jeff = UnregisteredUser.create(
  :email => "jeff@splittr.com"
)

ryan = UnregisteredUser.create(
  :email => "ryan@splittr.com"
)

flarnie = UnregisteredUser.create(
  :email => "flarnie@splittr.com"
)

guest = RegisteredUser.create(
  :email => "paul@splittr.com",
  :username => "Muad'Dib",
  :password => "I_must_n0t_fear"
)
