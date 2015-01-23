class UserController < ApplicationBaseController

  before_action :authenticate_user!, except: :custom_login

  before_filter :set_user

  def custom_login
    callback_url = params[:callback_url] || sso_callback_index_path
    session[:custom_return_to] = callback_url
    service = 'http://localhost:3000/users/service'
    return redirect_to ENV['SSO_CUSTOM_LOGIN_PATH'] + '?q=' + params[:q] + '&service=' + service unless params[:callback_url].present?
    authenticate_user!
  end

  private

  def set_user
    @user = current_user
  end

end