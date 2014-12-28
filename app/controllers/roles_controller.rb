class RolesController < ApplicationController

  def index
    query = {}
    if params[:project_id]
      query[:resource_id] = params[:project_id]
      query[:resource_type] = 'Project'
    end
    @roles = Pbl::Models::Role.all(query)
  end

  def create
    role = params[:role]
    if params[:project_id]
      role[:project_id] = params[:project_id]
      role[:resource_type] = 'Project'
    end
    @role = Pbl::Models::Role.create(role)
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