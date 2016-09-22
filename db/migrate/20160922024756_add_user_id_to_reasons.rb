class AddUserIdToReasons < ActiveRecord::Migration[5.0]
  def change
    add_column :reasons, :user_id, :integer
    add_index :reasons, :user_id
  end
end
