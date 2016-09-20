class CreateReasons < ActiveRecord::Migration[5.0]
  def change
    create_table :reasons do |t|
      t.string :name

      t.timestamps
    end

    add_column :bills, :reason_id, :integer
    remove_column :bills, :description, :text
  end
end
