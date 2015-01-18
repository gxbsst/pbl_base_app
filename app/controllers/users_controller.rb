class UsersController < ApplicationBaseController

  def index
    @users = User.all(limit: params[:limit])
  end

  def create
    @user = User.create(params[:user])
    render :show
  end

  def show
    @user = User.find(params[:id] || current_user.id, include: params[:include])
  end

  def update
    @user = User.update(params[:id], params[:user])
    render :show
  end

  def destroy
    @user = User.destroy(params[:id])
    render :show
  end

end