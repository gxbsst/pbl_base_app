module Curriculum
  class StandardsController < ApplicationController

    def index
      @standards = Curriculum::Standard.all
    end

    def show
      @standard = Curriculum::Standard.look_for(params[:id], include: 'items')
    end

  end
end