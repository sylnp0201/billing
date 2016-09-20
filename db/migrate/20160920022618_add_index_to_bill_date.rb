class AddIndexToBillDate < ActiveRecord::Migration[5.0]
  def change
    add_index :bills, :date
  end
end
