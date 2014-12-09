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
    @project =  Pbl::Models::Projects::Project.update(params[:id], { name: params[:data].project_name,
                                                                     driven_issue: params[:data].driven_issue,
                                                                     standard_analysis: params[:data].standard_analysis })
    render :show
  end

  def destroy
    @project =  Pbl::Models::Projects::Project.destroy(params[:id])
    render :show
  end

end