class FollowsController < ApplicationController

  def index
    @follows = Pbl::Models::Follow.where(params.permit(:include))
  end

  def create
    @follow = Pbl::Models::Follow.create(params[:follow])
    render :show
  end

  def show
    @follow = Pbl::Models::Follow.find(params[:id], include_param)
  end

  def update
    @follow = Pbl::Models::Follow.update(params[:id], params[:follow])
    render :show
  end

  def destroy
    @follow = Pbl::Models::Follow.destroy(params[:id])
    render :show
  end

end