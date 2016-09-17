class CreateCases < ActiveRecord::Migration[5.0]
  def change
    create_table :cases do |t|
      t.string :name
      t.date :deadline

      t.timestamps
    end
    add_index :cases, :name
    add_index :cases, :deadline
  end
end
