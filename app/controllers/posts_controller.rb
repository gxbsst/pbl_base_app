class PostsController < ApplicationController

  def index
    @posts = Post.all
  end

  def user_index
    @posts = Post.where(owner_type: :User, owner_id: params[:user_id] || current_user.id)
    render :index
  end

  def create
    @post = Post.create(params[:post])
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

end