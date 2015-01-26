module Curriculum
  class SubjectsController < ApplicationBaseController

    def index
      @subjects = Curriculum::Subject.all(limit: params[:limit])
    end

    def show
      @subject = Curriculum::Subject.find(params[:id], include_param)
    end

  end
end