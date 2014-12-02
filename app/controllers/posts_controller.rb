class PostsController < ApplicationController

  def index
    @posts = Posts.all
  end

  def create
    @post = Posts.new(params.require(:post).permit(:title, :content))
    if @post.save
      render 'show', :status => :created
    else
      render json: @post.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    set_post
  end

  def edit
    set_post
  end

  private

  def set_post
    @post ||= Posts.find(params[:id])
  end

end
