class PostsController < ApplicationController

  def index
    @posts = Post.where(query_params)
  end

  def user_index
    params[:owner_type] = :User
    params[:owner_id] = params[:user_id] || current_user.id
    params[:include] = ((params[:include] || '').split(',') << 'sender').join(',')
    @posts = Post.where(query_params)
    render :index
  end

  def group_index
    params[:owner_type] = :Group
    params[:owner_id] = params[:group_id]
    params[:include] = ((params[:include] || '').split(',') << 'sender').join(',')
    @posts = Post.where(query_params)
    render :index
  end

  def create
    post = params[:post]
    post[:user_id] = current_user.id
    post[:sender_id] = current_user.id
    if params[:group_id].present?
      post[:owner_type] = :Group
      post[:owner_id] = params[:group_id]
    else
      post[:owner_type] = :User
      post[:owner_id] = current_user.id
    end
    @post = Post.create(post)
    render :show
  end

  def show
    @post = Post.find(params[:id])
  end

  def update
    @post = Post.update(params[:id], params[:post])
    render :show
  end

  def destroy
    @post = Post.destroy(params[:id])
    render :show
  end

  private

  def query_params
    params.permit(:owner_type, :owner_id, :user_id, :sender_id, :include, :limit, :page)
  end

end