module Curriculum
  class StandardsController < ApplicationBaseController

    def index
      @standards = Curriculum::Standard.where(params.permit(:phase_id))
    end

    def show
      @standard = Curriculum::Standard.find(params[:id], include_param)
    end

  end
end