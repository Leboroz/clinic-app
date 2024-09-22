json.extract! appointment, :id, :firstname, :lastname, :created_at, :updated_at
json.url appointment_url(appointment, format: :json)
