class SsoCallbackController < ApplicationController

  def index
    #session.delete(:custom_return_to)
    render :index, layout: false
  end

end
