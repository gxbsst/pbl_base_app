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

  def join
    user_id = params[:user_id] || current_user.id
    user = User.find(user_id)
    if user.success?
      invitations = Invitation.where(code: params[:code])
      invitations[:data].each do |invitation|
        case invitation[:owner_type]
          when 'Clazz'
            if user[:type] == 'Parent'
              return render json: {errors: '只有老师及学生才能加入班级群！'}
            else
              student = Student.create({
                                           user_id: user_id,
                                           clazz_id: invitation[:owner_id]
                                       })
              if student.success?
                students = Student.where(clazz_id: student[:clazz_id])
                friend_ship = []
                students[:data].each do |entry|
                  friend_ship.push({
                                       user_id: user_id,
                                       friend_id: entry[:user_id]
                                   }) if user_id != entry[:user_id]
                end
                begin
                  FriendShip.create(friend_ship) unless friend_ship.empty?
                rescue => error
                  #puts error
                end
                @group = Group.find_by({
                                           owner_type: :Clazz,
                                           owner_id: invitation[:owner_id],
                                           include: 'clazzs'
                                       })
                return render 'groups/show'
              else
                return render json: {errors: '您已经是该群组成员！'}
              end
            end
          when 'ClazzParent'
            MemberShip.create({
                                  user_id: user_id,
                                  group_id: invitation[:owner_id]
                              })
            @group = Group.find_by({
                                       owner_type: :ClazzParent,
                                       owner_id: invitation[:owner_id],
                                       include: 'clazzs'
                                   })
            return render 'groups/show'
          when 'Group'
            MemberShip.create({
                                  user_id: user_id,
                                  group_id: invitation[:owner_id]
                              })
            @group = Group.find(invitation[:owner_id], include: :clazzs)
            return render 'groups/show'
          else
        end
      end
    else
      head 404
    end
    render json: {errors: '无效的邀请码，请核对后重试！'}
  end

  def create
    group = params[:group]
    group[:owner_id] ||= current_user.id
    group[:owner_type] ||= :Group
    @group = Group.create(group)
    if @group.success?
      invitation = {
          owner_type: :Group,
          owner_id: @group[:id]
      }
      Invitation.create(invitation)
    end
    render :show
  end

  def show
    @group = Group.find(params[:id], query_params)
  end

  def update
    @group = Group.update(params[:id], params[:group].block('code'))
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