class UsersController < ApplicationBaseController

  def index
    @users = Pbl::Models::Users::User.all
  end

  def create
    @user = Pbl::Models::Users::User.create(params[:user])
    render :show
  end

  def show
    @user = Pbl::Models::Users::User.find(params[:id] || current_user.id, include: params[:include])
  end

  def update
    @user = Pbl::Models::Users::User.update(params[:id], params[:user])
    render :show
  end

  def destroy
    @user = Pbl::Models::Users::User.destroy(params[:id])
    render :show
  end

end