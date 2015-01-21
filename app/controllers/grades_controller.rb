class GradesController < ApplicationController

  def index
    @grades = Grade.all
  end

  def create
    @grade = Grade.create(params[:grade])
    render :show
  end

  def show
    @grade = Grade.find(params[:id])
  end

  def update
    @grade = Grade.update(params[:id], params[:grade])
    render :show
  end

  def destroy
    @grade = Grade.destroy(params[:id])
    render :show
  end

end