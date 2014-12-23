class FollowsController < UserController

  def index
    @follows = Follow.where(params.permit(:include))
  end

  def create
    @follow = Follow.create(params[:follow])
    render :show
  end

  def show
    @follow = Follow.find(params[:id], include_param)
  end

  def update
    @follow = Follow.update(params[:id], params[:follow])
    render :show
  end

  def destroy
    @follow = Follow.destroy(params[:id])
    render :show
  end

end