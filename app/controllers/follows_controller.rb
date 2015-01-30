class FollowsController < ApplicationController

  def index
    @follows = Follow.where(query_params)
  end

  def unfollow
    Follow.destroy_by({
                          user_id: params[:user_id],
                          follower_id: current_user.id
                      })
    head :ok
  end

  def create
    follow = params[:follow]
    follow[:follower_id] ||= current_user.id
    @follow = Follow.create(follow)
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

  private

  def query_params
    params.permit(:ids, :user_id, :follower_id, :include, :limit, :page)
  end

end