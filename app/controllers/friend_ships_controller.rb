class FriendShipsController < ApplicationController

  def index
    @friend_ships = FriendShip.all
  end

  def create
    @friend_ship = FriendShip.create(params[:friend_ship])
    render :show
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

end