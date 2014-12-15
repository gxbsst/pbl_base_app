module Curriculum
  class PhasesController < ApplicationBaseController

    def index
      @phases = Curriculum::Phase.where(params.permit(:subject_id, :include))
    end

    def show
      @phase = Curriculum::Phase.find(params[:id], include_param)
    end

  end
end