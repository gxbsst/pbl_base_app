class GroupsController < ApplicationBaseController

  def index
    @groups = Group.where(ids: params[:ids], owner_id: params[:owner_id], owner_type: params[:owner_type] || :User)
  end

  def current_user_index
    @groups = Group.where(owner_id: current_user.id, owner_type: params[:owner_type] || :User)
    render :index
  end

  def create
    group = params[:group]
    group[:owner_id] ||= current_user.id
    group[:owner_type] ||= 'User'
    @group = Group.create(group)
    invitation = {
        owner_type: :Group,
        owner_id: @group[:id]
    }
    @invitation = Invitation.create(invitation)
    render :show
  end

  def show
    @group = Group.find(params[:id], include_param)
  end

  def update
    @group = Group.update(params[:id], params[:group])
    render :show
  end

  def destroy
    @group = Group.destroy(params[:id])
    render :show
  end

end