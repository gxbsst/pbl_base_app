module Curriculum
  class StandardsController < ApplicationBaseController

    def index
      @standards = Pbl::Models::Curriculum::Standard.where(params.permit(:phase_id, :include))
    end

    def show
      @standard = Pbl::Models::Curriculum::Standard.find(params[:id], include_param)
    end

  end
end