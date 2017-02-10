class Api::ApiApplicationController < ActionController::Base
  # protect_from_forgery with: :null_session
  # include ActionController::HttpAuthentication::Basic::ControllerMethods
  # include ActionController::HttpAuthentication::Token::ControllerMethods
  # before_action :authenticate_device
  # helper_method :current_user
  # #
  # def authenticate_device
  #   authenticate_or_request_with_http_token do |token, options|
  #     auth_token = token
  #     # @current_user = User.includes(:devices).find_by("devices.session_token = (?) ", auth_token)
  #     @current_user = User.find_by_token(auth_token)
  #   end
  # end
  #
  # #
  # def current_user
  #   current_user = @current_user
  # end


end
