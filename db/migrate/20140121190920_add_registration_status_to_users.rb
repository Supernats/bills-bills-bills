class AddRegistrationStatusToUsers < ActiveRecord::Migration
  def up
    add_column :users, :registration_status, :string
  end

  def down
    remove_column :users, :registration_status
  end
end
