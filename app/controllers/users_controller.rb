class UsersController < UserController

  before_action :authenticate_user!, except: :create
  before_filter :set_user, except: :create

  def index
    @users = User.all(user_query_params)
  end

  def create
    @user = User.create(params[:user])
    if @user.success? && @user[:type] == :Student
      invitation = {
          owner_type: :Student,
          owner_id: @user[:id]
      }
      @invitation = Invitation.create(invitation)
    end
    render :show
  end

  def show
    set_user
  end

  def update
    id = params[:id]
    if params[:include]
      id += "?include=#{params[:include]}"
    end
    User.update(id, params[:user])
    set_user
    render :show
  end

  def destroy
    @user = User.destroy(params[:id])
    render :show
  end

  private

  def set_user
    user_id = params[:id] || current_user.id
    @user = User.find(user_id, include: params[:include])
    @step = Step.find_by_user_id(user_id)
  end

  def user_query_params
    params.permit(:username, :include, :limit)
  end

end