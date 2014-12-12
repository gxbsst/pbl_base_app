module Curriculum
  class SubjectsController < ApplicationController

    def index
      @subjects = Curriculum::Subject.all
    end

    def show
      @subject = Curriculum::Subject.look_for(params[:id], include: 'phases')
    end

  end
end