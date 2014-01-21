class AddTotalToTransactions < ActiveRecord::Migration
  def up
    add_column :transactions, :total, :integer
  end

  def down
    remove_column :transactions, :total
  end
end
