class DoctorController < ApplicationController
  before_action :check_doctor_role
  def index
    @appointments = Appointment.all
  end

  private

  def check_doctor_role
    check_user_role('doctor')
  end
end
