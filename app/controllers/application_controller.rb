class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :authenticate_user!, except: :custom_login

  def after_sign_in_path_for(resource)
    if session['custom_return_to'].present?
      session.fetch(:custom_return_to)
    else
      super
    end
  end

  def custom_login
    session["custom_return_to"] = sso_callback_path
    redirect_to ENV['SSO_CUSTOM_LOGIN_PATH']
  end
end