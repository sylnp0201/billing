json.array! @result.values do |item|
  json.case item[:case]
  json.bills item[:bills], :id, :case_id, :date, :spent, :reason
  json.stats item[:stats]
end
