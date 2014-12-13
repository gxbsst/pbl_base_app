module Curriculum
  class PhasesController < ApplicationBaseController

    def show
      @phase = Curriculum::Phase.find(params[:id], include_param)
    end

  end
end