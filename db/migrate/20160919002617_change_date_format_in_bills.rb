class ChangeDateFormatInBills < ActiveRecord::Migration[5.0]
  def up
    change_column :bills, :date, :datetime
  end

  def down
    change_column :bills, :date, :date
  end
end
