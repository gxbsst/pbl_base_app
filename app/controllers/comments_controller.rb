class CommentsController < ApplicationController

  def index
    @comments = Comment.all
  end

  def post_index
    params[:commentable_type] = :Post
    params[:commentable_id] = params[:post_id]
    params[:include] = :users
    @comments = Comment.where(query_params)
    render :index
  end

  def create
    @comment = Comment.create(params[:comment])
    render :show
  end

  def post_create
    comment = params[:comment]
    comment[:commentable_type] = :Post
    comment[:commentable_id] = params[:post_id]
    comment[:user_id] = current_user.id
    @comment = Comment.create(comment)
    puts '............'
    puts params[:post_id]
    puts '............'
    NotificationDeliveryWorker.perform_async(params[:post_id])
    render :show
  end

  def show
    @comment = Comment.find(params[:id])
  end

  def update
    @comment = Comment.update(params[:id], params[:comment])
    render :show
  end

  def destroy
    @comment = Comment.destroy(params[:id])
    render :show
  end

  private

  def query_params
    params.permit(:commentable_type, :commentable_id, :user_id, :include, :limit, :page)
  end

end