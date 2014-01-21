class ChangeRegistrationStatusToType < ActiveRecord::Migration
  def up
    rename_column :users, :registration_status, :type
  end

  def down
    rename_column :users, :type, :registration_status
  end
end
