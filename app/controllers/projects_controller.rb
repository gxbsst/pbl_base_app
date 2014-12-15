class ProjectsController < ApplicationBaseController

  def index
    @projects = Pbl::Project.all(project_query_params)
  end

  def create
    @project = Pbl::Project.create(params[:project])
    render :show
  end

  def show
    @project = Pbl::Project.find(params[:id], include_param)
  end

  def update
    @project =  Pbl::Project.update(params[:id], params[:project])
    render :show
  end

  def destroy
    @project =  Pbl::Project.destroy(params[:id])
    render :show
  end

  private

    def project_query_params
      params.permit(:name, :include)
    end

end