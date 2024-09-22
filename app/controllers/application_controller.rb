class ApplicationController < ActionController::Base
  before_action :update_allowed_parameters, if: :devise_controller?
  before_action :authenticate_user!

  protected

  def update_allowed_parameters
    devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:email, :password, :password_confirmation, :role) }
    devise_parameter_sanitizer.permit(:account_update) do |u|
      u.permit(:email, :password, :current_password, :role)
    end
  end

  private

  def check_user_role(role)
    return if current_user.role == role

    flash[:alert] = 'Permition needed'
    redirect_to authenticated_root_path
  end
end
