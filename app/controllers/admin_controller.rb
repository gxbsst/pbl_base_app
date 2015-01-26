class AdminController < ActionController::Base

  before_filter :http_authenticate

  protected
  def http_authenticate
    authenticate_or_request_with_http_basic do |user_name, password|
      user_name == 'admin' && password == '1111'
    end
  end

  layout 'layouts/admin'

end