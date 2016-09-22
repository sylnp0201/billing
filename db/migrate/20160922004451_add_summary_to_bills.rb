class AddSummaryToBills < ActiveRecord::Migration[5.0]
  def change
    remove_column :bills, :reason_id, :integer
    add_column :bills, :task, :string
    add_column :bills, :start_time, :datetime
    add_column :bills, :end_time, :datetime
    add_column :cases, :summary, :text
  end
end
