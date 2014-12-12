module Curriculum
  class PhasesController < ApplicationController

    def show
      @phase = Curriculum::Phase.look_for(params[:id], include: 'standards')
    end

  end
end