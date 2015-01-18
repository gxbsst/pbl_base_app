class SchoolsController < ApplicationController

  def index
    @schools = School.all
  end

  def create
    @school = School.create(params[:school])
    render :show
  end

  def show
    @school = School.find(params[:id])
  end

  def update
    @school = School.update(params[:id], params[:school])
    render :show
  end

  def destroy
    @school = School.destroy(params[:id])
    render :show
  end

end