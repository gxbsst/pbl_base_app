module Curriculum
  class PhasesController < ApplicationBaseController

    def index
      @phases = Curriculum::Phase.all(params[:subject_id])
    end

    def show
      @phase = Curriculum::Phase.find(params[:id], include_param)
    end

  end
end