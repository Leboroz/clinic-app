json.extract! @appointments_by_date , :date, :total_count
json.url data_url(@appointments_by_date, format: :json)
