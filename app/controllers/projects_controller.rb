class ProjectsController < ApplicationBaseController

  def index
    @projects = Pbl::Project.all(query_params)
  end

  def create
    project = params[:project] || {}
    project[:user_id] = current_user.id
    @project = Pbl::Project.create(project)
    render :show
  end

  def show
    @project = Pbl::Project.find(params[:id], include_param)
    if include_param[:include].present? && include_param[:include].split(',').include?('knowledges')
      knowledges = Pbl::Knowledge.where(project_id: @project[:id])
      @project[:knowledges] = knowledges[:data] if knowledges[:data]
    end
  end

  def update
    @project =  Pbl::Project.update(params[:id], params[:project])
    render :show
  end

  def release
    @project = Pbl::Project.release(params[:id])
    render :show
  end

  def destroy
    @project =  Pbl::Project.destroy(params[:id])
    render :show
  end

  private

    def query_params
      params.permit(:name, :include, :limit,:page, :subject, :phase, :technique, :name, :order,:user_id,:actor_id,:state, :recommend)
    end

end