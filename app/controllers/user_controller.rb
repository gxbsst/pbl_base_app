class UserController < ApplicationBaseController

  before_action :authenticate_user!, except: :custom_login

  before_filter :set_user

  def after_sign_in_path_for(resource)
    if session['custom_return_to'].present?
      session.fetch(:custom_return_to)
    else
      super
    end
  end

  def custom_login
    callback_url = params[:callback_url] || sso_callback_index_path
    session["custom_return_to"] = callback_url
    return redirect_to ENV['SSO_CUSTOM_LOGIN_PATH'] unless params[:callback_url].present?
    authenticate_user!
  end

  private

  def set_user
    @user = current_user
  end

end