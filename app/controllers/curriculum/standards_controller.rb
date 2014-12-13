module Curriculum
  class StandardsController < ApplicationBaseController

    def show
      @standard = Pbl::Models::Curriculum::Standard.find(params[:id], include_param)
    end

  end
end