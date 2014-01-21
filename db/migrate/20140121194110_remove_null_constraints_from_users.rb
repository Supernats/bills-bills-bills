class RemoveNullConstraintsFromUsers < ActiveRecord::Migration
  def up
    change_table :users do |t|
      t.change :password_digest, :string, :null => true
      t.change :username, :string, :null => true
      t.change :session_token, :string, :null => true
    end
  end

  def down
    change_table :users do |t|
      t.change :password_digest, :string, :null => false
      t.change :username, :string, :null => false
      t.change :session_token, :string, :null => false
    end
  end
end
