class CreateAppointments < ActiveRecord::Migration[7.0]
  def change
    create_table :appointments do |t|
      t.string :firstname
      t.string :lastname

      t.timestamps
    end
  end
end
