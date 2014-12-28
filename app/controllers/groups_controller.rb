class GroupsController < ApplicationBaseController

  def index
    @groups = Pbl::Models::Groups::Group.where(params.permit(:include))
  end

  def create
    @group = Pbl::Models::Groups::Group.create(params[:group])
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