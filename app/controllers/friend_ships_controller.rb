class FriendShipsController < ApplicationController

  def index
    @friend_ships = FriendShip.all
  end

  def user_children
    if user[:type] == 'Parent'
      @friend_ships = FriendShip.where(user_id: params[:user_id] || current_user.id, relation_null: :false, include: 'friends')
      render :index
    else
      render 'share/empty'
    end
  end

  def user_friends
    @friend_ships = FriendShip.where(user_id: params[:user_id] || current_user.id, include: 'friends')
    render :index
  end

  def add_user_child
    child = params[:child]
    if child[:parent_code].present?
      invitations = Invitation.where(code: child[:parent_code])
      invitations[:data].each do |invitation|
        if invitation[:owner_type] == 'Student'
          friend_ship = {
              user_id: params[:user_id] || current_user.id,
              friend_id: invitation[:owner_id],
              relation: child[:relation]
          }
          @friend_ship = FriendShip.where(friend_ship)
          if @friend_ship[:data].size == 0
            @friend_ship = FriendShip.create(friend_ship)
          else
            @friend_ship = @friend_ship[:data].first
            @friend_ship.success = true
          end
        end
      end
    end
    head :created
  end

  def create
    @friend_ship = FriendShip.create(params[:friend_ship])
    head :created
  end

  def show
    @friend_ship = FriendShip.find(params[:id])
  end

  def update
    @friend_ship = FriendShip.update(params[:id], params[:friend_ship])
    render :show
  end

  def destroy
    @friend_ship = FriendShip.destroy(params[:id])
    render :show
  end

  private

  def user
    User.find(params[:user_id] || current_user.id)
  end

end