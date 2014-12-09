class ProjectsController < ApplicationController

  def index
    @projects = Pbl::Models::Projects::Project.all
  end

  def create
    @project = Pbl::Models::Projects::Project.create(params[:project])
    render :show
  end

  def show
    @project = Pbl::Models::Projects::Project.find(params[:id])
  end

  def update
    params[:data][:name] = params[:data][:project_name]
    @project =  Pbl::Models::Projects::Project.update(params[:id], params[:data])
    render :show
  end

  def destroy
    @project =  Pbl::Models::Projects::Project.destroy(params[:id])
    render :show
  end

end