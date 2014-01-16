class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.datetime :date, :null => false

      t.timestamps
    end
  end
end
