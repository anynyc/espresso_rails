class Admin::AdminApplicationController < ActionController::Base
  before_filter :authenticate
  layout 'admin_application'

  def authenticate
    redirect_to admin_login_path unless current_admin
  end

  def current_admin
    @current_admin ||= Admin.find(session[:admin_id]) if session[:admin_id]
  end

  helper_method :current_admin


end
