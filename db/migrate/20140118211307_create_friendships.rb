class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.integer :source_friend_id, :null => false
      t.integer :target_friend_id, :null => false

      t.timestamps
    end
    add_index :friendships, :source_friend_id
    add_index :friendships, :target_friend_id
  end
end
