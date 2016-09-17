class CreateBills < ActiveRecord::Migration[5.0]
  def change
    create_table :bills do |t|
      t.integer :user_id
      t.integer :case_id
      t.date :date
      t.text :description
      t.float :spent

      t.timestamps
    end

    add_index :bills, [:user_id, :case_id]
  end
end
