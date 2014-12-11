module Curriculum
  class PhasesController < ApplicationController

    def index
      @phases = Curriculum::Phase.all
    end

    def show
      @phase = Curriculum::Standard.look_for(params[:id], include: 'standards')
    end

  end
end