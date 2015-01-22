class MemberShipsController < ApplicationBaseController

  def index
    @member_ships = MemberShip.where(group_id: params[:group_id], user_id: params[:user_id])
  end

  def current_user_index
    @member_ships = MemberShip.where(user_id: current_user.id)
    render :index
  end

  def create
    member_ship = params[:member_ship]
    member_ship[:group_id] ||= params[:group_id]
    member_ship[:user_id] ||= current_user.id
    @member_ship = MemberShip.create(member_ship)
    render :show
  end

  def destroy
    @member_ship = MemberShip.destroy(params[:id])
    render :show
  end

end