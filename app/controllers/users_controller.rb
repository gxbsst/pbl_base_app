class UsersController < ApplicationBaseController

  def index
    @users = User.all(user_query_params)
  end

  def create
    @user = User.create(params[:user])
    if @user[:type] == :Student
      invitation = {
          owner_type: :User,
          owner_id: @user[:id]
      }
      @invitation = Invitation.create(invitation)
    end
    render :show
  end

  def show
    @user = User.find(params[:id] || current_user.id, include: params[:include])
  end

  def update
    id = params[:id]
    if params[:include]
      id += "?include=#{params[:include]}"
    end
    @user = User.update(id, params[:user])
    render :show
  end

  def destroy
    @user = User.destroy(params[:id])
    render :show
  end

  private

  def user_query_params
    params.permit(:username, :include, :limit)
  end

end