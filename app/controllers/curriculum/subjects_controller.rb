module Curriculum
  class SubjectsController < ApplicationController

    def index
      @subjects = Curriculum::Subject.all
    end

    def show
      @subject = Curriculum::Subject.look_for(params[:id], include: 'phases')
    end

    # def create
    #   @subject = Curriculum::Subject.create(params[:subject])
    #   render :show
    # end
    #
    # def update
    #   @subject =  Curriculum::Subject.update(params[:id], params[:subject])
    #   render :show
    # end
    #
    # def destroy
    #   @subject =  Curriculum::Subject.destroy(params[:id])
    #   render :show
    # end

  end
end