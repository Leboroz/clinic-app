# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require_relative '../lib/populator_fix'

Appointment.populate 100 do |u|
  u.firstname = Faker::Name.first_name
  u.lastname = Faker::Name.last_name
  date = Faker::Date.between(from: '2024-01-01', to: '2024-09-22')
  u.created_at = date
  u.updated_at = date
end
