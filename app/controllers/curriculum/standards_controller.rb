module Curriculum
  class StandardsController < ApplicationController

    def show
      @standard = Pbl::Models::Curriculum::Standard.look_for(params[:id], include: 'items')
    end

  end
end