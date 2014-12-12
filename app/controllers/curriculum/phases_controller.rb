module Curriculum
  class PhasesController < ApplicationController

    def show
      if params[:include]
        @phase = Curriculum::Phase.find(params[:id], include: params[:include])
      else
        @phase = Curriculum::Phase.find(params[:id])
      end
    end

  end
end