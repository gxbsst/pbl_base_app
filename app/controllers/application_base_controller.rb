class ApplicationBaseController < ApplicationController

  def include_param
    params.permit(:include)
  end


end