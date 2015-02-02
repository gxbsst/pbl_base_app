class FollowsController < ApplicationController

  def index
    @follows = Follow.where(query_params)
  end

  def user_index
    params[:follower_id] = params[:user_id] || current_user.id
    params.delete(:user_id)
    @follows = Follow.where(query_params)
    render :index
  end

  def unfollow
    follows = Follow.where({
                               user_id: params[:user_id],
                               follower_id: current_user.id
                           })
    follows[:data].each do |entry|
      Follow.destroy(entry[:id])
      NotificationDeliveryWorker.perform_async({
                                                   event_type: :unfollow,
                                                   sender_type: :User,
                                                   sender_id: entry[:follower_id],
                                                   user_id: entry[:user_id],
                                                   additional_info: {
                                                       follow_id: entry[:id]
                                                   },
                                                   type: :System
                                               })
    end if follows[:data]
    head :ok
  end

  def create
    follow = params[:follow]
    follow[:follower_id] ||= current_user.id
    @follow = Follow.create(follow)
    if @follow.success?
      NotificationDeliveryWorker.perform_async({
                                                   event_type: :follow,
                                                   sender_type: :User,
                                                   sender_id: @follow[:follower_id],
                                                   user_id: @follow[:user_id],
                                                   additional_info: {
                                                       follow_id: @follow[:id]
                                                   },
                                                   type: :System
                                               })
    end
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