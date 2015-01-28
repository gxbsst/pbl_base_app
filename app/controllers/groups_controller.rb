class GroupsController < ApplicationBaseController

  def index
    @groups = Group.where(query_params)
  end

  def user_index
    user_id = params[:user_id] || current_user.id
    member_ships = MemberShip.where(user_id: user_id)
    students = Student.where(user_id: user_id)
    @groups = Group.where(ids: member_ships[:data].map(&:group_id).join(','), limit: 100) unless member_ships[:data].empty?
    unless students[:data].empty?
      clazzs = Group.where(owner_ids: students[:data].map(&:clazz_id).join(','), limit: 100)
      clazzs[:data].each do |group|
        group[:clazz] = Clazz.find(group[:owner_id])
      end
      if @groups.present?
        @groups[:data].concat(clazzs[:data])
        @groups[:meta][:total_count] += clazzs[:data].size
      else
        @groups = clazzs
      end
    end
    if @groups.present?
      render :index
    else
      render 'share/empty'
    end
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
    @group = Group.find(params[:id], query_params)
    @group[:clazz] = Clazz.find(@group[:owner_id]) if @group && @group[:owner_id] && @group[:owner_type] == 'Clazz'
  end

  def update
    @group = Group.update(params[:id], params[:group])
    render :show
  end

  def destroy
    @group = Group.destroy(params[:id])
    render :show
  end

  private

  def query_params
    params.permit(:ids, :name, :owner_id, :owner_ids, :owner_type, :include, :limit, :page)
  end

end