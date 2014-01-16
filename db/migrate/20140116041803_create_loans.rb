class CreateLoans < ActiveRecord::Migration
  def change
    create_table :loans do |t|
      t.integer :transaction_id, :null => false
      t.integer :creditor_id, :null => false
      t.integer :debtor_id, :null => false
      t.integer :amount, :null => false

      t.timestamps
    end
    add_index :loans, :transaction_id
    add_index :loans, :creditor_id
    add_index :loans, :debtor_id, :null => false
  end
end
