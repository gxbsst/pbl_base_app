class GroupsController < ApplicationBaseController

  def index
    @groups = Pbl::Models::Groups::Group.where(user_id: params[:user_id])
  end

  def current_user_index
    @groups = Pbl::Models::Groups::Group.where(user_id: current_user.id)
    render :index
  end

  def create
    group = params[:group]
    group[:user_id] ||= current_user.id
    @group = Pbl::Models::Groups::Group.create(group)
    render :show
  end

  def show
    @group = Pbl::Models::Groups::Group.find(params[:id], include_param)
  end

  def update
    @group = Pbl::Models::Groups::Group.update(params[:id], params[:group])
    render :show
  end

  def destroy
    @group = Pbl::Models::Groups::Group.destroy(params[:id])
    render :show
  end

end