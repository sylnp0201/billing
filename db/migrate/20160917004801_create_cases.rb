class CreateCases < ActiveRecord::Migration[5.0]
  def change
    create_table :cases do |t|
      t.integer :user_id, index: true
      t.string :name, index: true
      t.date :deadline, index: true
      t.string :client
      t.string :description

      t.timestamps
    end

    add_index :cases, [:user_id, :name]
  end
end
