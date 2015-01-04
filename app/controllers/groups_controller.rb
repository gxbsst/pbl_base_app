class GroupsController < ApplicationBaseController

  def index
    @groups = Pbl::Models::Groups::Group.where(owner_id: params[:owner_id], owner_type: 'User')
  end

  def current_user_index
    @groups = Pbl::Models::Groups::Group.where(owner_id: current_user.id, owner_type: 'User')
    render :index
  end

  def create
    group = params[:group]
    group[:owner_id] ||= current_user.id
    group[:owner_type] ||= 'User'
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