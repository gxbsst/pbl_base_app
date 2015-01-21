class DiscussionsController < ApplicationBaseController

  def index
    @discussions = Pbl::Discussion.all(project_id: params[:project_id])
  end

  def create
    @discussion = Pbl::Discussion.create(params[:discussion])
    render :show
  end

  def show
    @discussion = Pbl::Discussion.find(params[:id])
  end

  def update
    @discussion = Pbl::Discussion.update(params[:id], params[:discussion])
    render :show
  end

  def destroy
    @discussion = Pbl::Discussion.destroy(params[:id])
    render :show
  end

end