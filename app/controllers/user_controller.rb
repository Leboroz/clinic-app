class UserController < ApplicationController
  def index
    redirect_to controller: :appointments, action: :index if current_user.role == 'receptionist'
    redirect_to controller: :doctor, action: :index if current_user.role == 'doctor'
  end
end
