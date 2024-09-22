class DataController < ApplicationController
  def index
    @appointments_by_date = Appointment.select('date(created_at) as date, count(created_at) as total_count')
                                       .group('date(created_at)')
                                       .order(total_count: :desc)
    if @appointments_by_date
      render json: @appointments_by_date, status: :ok
    else
      render json: @appointments_by_date.errors, status: 400
    end
  end
end
