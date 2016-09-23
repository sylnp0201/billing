class CreateDownloads < ActiveRecord::Migration[5.0]
  def change
    create_table :downloads do |t|
      t.string :token
      t.integer :user_id
    end

    add_index :downloads, :token
  end
end
