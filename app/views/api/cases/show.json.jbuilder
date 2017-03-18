json.(@case, :id, :name, :client, :description, :summary)
json.bills do
  json.array! @case.bills.order(date: :desc), :date, :spent, :task
end
json.spent @case.bills.map(&:spent).sum
