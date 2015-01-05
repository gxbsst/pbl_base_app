class DiscussionsController < ApplicationBaseController

  def index
    @discussions = Pbl::Models::Projects::Discussion.all(project_id: params[:project_id])
  end

  def create
    @discussion = Pbl::Models::Projects::Discussion.create(params[:discussion])
    render :show
  end

  def show
    @discussion = Pbl::Models::Projects::Discussion.find(params[:id])
  end

  def update
    @discussion = Pbl::Models::Projects::Discussion.update(params[:id], params[:discussion])
    render :show
  end

  def destroy
    @discussion = Pbl::Models::Projects::Discussion.destroy(params[:id])
    render :show
  end

end