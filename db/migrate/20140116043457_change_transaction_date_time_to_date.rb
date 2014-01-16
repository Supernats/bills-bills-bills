class ChangeTransactionDateTimeToDate < ActiveRecord::Migration
  def change
    change_column :transactions, :date, :date, :null => false
    add_column :transactions, :description, :string, :null => false
  end
end
