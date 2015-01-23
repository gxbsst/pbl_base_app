class UsersController < UserController

  before_action :authenticate_user!, except: :create
  before_filter :set_user, except: :create

  def index
    @users = User.all(user_query_params)
  end

  def create
    @user = User.create(params[:user])
    if @user[:type] == :Student
      invitation = {
          owner_type: :Student,
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
    set_user
    id = params[:id]
    if params[:include]
      id += "?include=#{params[:include]}"
    end
=begin
    if params[:clazz_id] && params[:clazz_id] != user[:clazz_id]
      groups = Group.all(owner_type: :Clazz, owner_id: user[:clazz_id])
      groups.each do |group|
        memberships = MemberShip.all(group_id: group[:id], user_id: user[:id])
        memberships.each do |membership|
          MemberShip.destroy(membership[:id])
        end
      end
    end
=end
    @user = User.update(id, params[:user])
    render :show
  end

  def destroy
    @user = User.destroy(params[:id])
    render :show
  end

  private

  def set_user
    user = User.find(params[:id] || current_user.id, include: params[:include])
  end

  def user_query_params
    params.permit(:username, :include, :limit)
  end

end