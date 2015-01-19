class SchoolsController < ApplicationController

  def index
    @schools = School.where(region_id: params[:region_id], limit: 50)
  end

  def create
    school = params[:school]
    school[:user_id] ||= current_user.id
    @school = School.create(school)
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