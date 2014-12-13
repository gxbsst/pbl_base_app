module Curriculum
  class StandardsController < ApplicationBaseController

    def show
      @standard = Curriculum::Standard.find(params[:id], include_param)
    end

  end
end