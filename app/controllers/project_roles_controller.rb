class ProjectRolesController < ApplicationController

  def index
    @roles = Pbl::Models::Role.all(resource_id: params[:project_id], resource_type: 'Project')
  end

  def create
    @role = Pbl::Models::Role.create(params[:role])
    render :show
  end

  def show
    @role = Pbl::Models::Role.find(params[:id])
  end

  def update
    @role = Pbl::Models::Role.update(params[:id], params[:role])
    render :show
  end

  def destroy
    @role = Pbl::Models::Role.destroy(params[:id])
    render :show
  end

end