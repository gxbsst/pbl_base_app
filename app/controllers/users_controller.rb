class UsersController < UserController

  before_action :authenticate_user!, except: :create
  before_filter :set_user, except: :create

  def index
    @users = User.all(user_query_params)
  end

  def create
    user = params[:user]
    @user = User.create(user)
    if @user.success?
      case @user[:type]
        when :Student
          invitation = {
              owner_type: :Student,
              owner_id: @user[:id]
          }
          @invitation = Invitation.create(invitation)
        when :Parent
          unless user[:parent_code].blank?
            invitations = Invitation.where(code: user[:parent_code])
            friend_ship = []
            invitations[:data].each do |invitation|
              friend_ship.push({
                                   user_id: @user[:id],
                                   friend_id: invitation[:user_id],
                                   relation: '0'
                               })
            end
            FriendShip.create(friend_ship) unless friend_ship.empty?
          end
      end
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
    user = params[:user]
    if user[:relation]
      user[:gender] = user[:relation] if user[:relation] > 0
      update_friend_ships(id, user[:relation])
    end
    User.update(id, user)
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

  def update_friend_ship(friend_ships, relation)
    user = {user: { relation: relation.to_s }}
    friend_ships[:data].each do |friend_ship|
      FriendShip.update(friend_ship[:id], user)
    end
  end

  def update_friend_ships(id, relation)
    friend_ships = FriendShip.where(user_id: id, relation: relation.to_s)
    update_friend_ship(friend_ships, relation)
    friend_ships = FriendShip.where(friend_id: id, relation: relation.to_s)
    update_friend_ship(friend_ships, relation)
  end

end