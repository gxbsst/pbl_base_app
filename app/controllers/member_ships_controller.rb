class MemberShipsController < ApplicationBaseController

  def index
    @member_ships = Pbl::Models::Groups::MemberShip.where(group_id: params[:group_id], user_id: params[:user_id])
  end

  def current_user_index
    @member_ships = Pbl::Models::Groups::MemberShip.where(user_id: current_user.id)
    render :index
  end

  def create
    @member_ship = Pbl::Models::Groups::MemberShip.create(group_id: params[:group_id], user_id: params[:user_id] || current_user.id)
    render :show
  end

  def destroy
    @member_ship = Pbl::Models::Groups::MemberShip.destroy(params[:id])
    render :show
  end

end