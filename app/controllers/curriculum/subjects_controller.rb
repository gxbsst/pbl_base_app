module Curriculum
  class SubjectsController < ApplicationController

    def index
      @subjects = Curriculum::Subject.all
    end

    def show
      if params[:include]
        @subject = Curriculum::Subject.find(params[:id], include: params[:include])
      else
        @subject = Curriculum::Subject.find(params[:id])
      end
    end

  end
end