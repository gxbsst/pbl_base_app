# encoding: utf-8
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
                                           owner_id: invitation[:owner_id]
                                       })
                return render 'groups/show' if @group
              else
                return render json: {errors: '您已经是该群组成员！'}
              end
            end
          when 'Parent'
            @group = Group.find_by({
                                       owner_type: :ClazzParent,
                                       owner_id: invitation[:owner_id]
                                   })
            if @group
              MemberShip.create({
                                    user_id: user_id,
                                    group_id: invitation[:owner_id]
                                })

              return render 'groups/show'
            end
          when 'User'
            @group = Group.find(invitation[:owner_id])
            if @group.success?
              MemberShip.create({
                                    user_id: user_id,
                                    group_id: invitation[:owner_id]
                                })
              return render 'groups/show'
            end
          else
        end
      end
    else
      head 404
    end
    render json: {errors: '无效的邀请码，请核对后重试！'}
  end

  def join_by_group_id
    @group = Group.find(params[:group_id])
    if @group.success?
      MemberShip.create({
                            user_id: current_user.id,
                            group_id: params[:group_id]
                        })
    end
    render :show
  end

  def leave
    user_id = params[:user_id] || current_user.id
    group = Group.find(params[:group_id])
    if group.success?
      case group[:owner_type]
        when 'Clazz'
          students = Student.where({
                                       user_id: user_id,
                                       clazz_id: group[:owner_id]
                                   })
          students[:data].each do |entry|
            Student.destroy(entry[:id])
            NotificationDeliveryWorker.perform_async({
                                                         event_type: :leave,
                                                         sender_type: :Clazz,
                                                         sender_id: group[:owner_id],
                                                         user_id: user_id,
                                                         type: :System
                                                     }) if user_id != current_user.id
          end if students[:data]
        else
          member_ships = MemberShip.where({
                                              user_id: user_id,
                                              group_id: group[:id]
                                          })
          member_ships[:data].each do |entry|
            MemberShip.destroy(entry[:id])
            NotificationDeliveryWorker.perform_async({
                                                         event_type: :leave,
                                                         sender_type: :Group,
                                                         sender_id: group[:id],
                                                         user_id: user_id,
                                                         type: :System
                                                     }) if user_id != current_user.id
          end if member_ships[:data]
      end
    end
    head :ok
  end

  def create
    group = params[:group]
    group[:owner_id] ||= current_user.id
    group[:owner_type] ||= :User
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
    @group[:clazz] = Clazz.find(@group[:owner_id], include: 'users') if @group[:owner_type] == 'Clazz' || @group[:owner_type] == 'Parent'
    @group[:user] = User.find(@group[:owner_id]) if @group[:owner_type] == 'User'
    invitation = Invitation.find_by(case @group[:owner_type]
                                      when 'Clazz'
                                        {
                                            owner_type: :Clazz,
                                            owner_id: @group[:clazz][:id]
                                        }
                                      else
                                        {
                                            owner_type: :Group,
                                            owner_id: @group[:id]
                                        }
                                    end)
    unless invitation.nil?
      @group[:invitation_code] = invitation[:invitation_code]
    end
  end

  def update
    @group = Group.update(params[:id], params[:group].pass(%w(name description label)))
    render :show
  end

  def destroy
    @group = Group.destroy(params[:id])
    member_ships = MemberShip.where(group_id: @group[:id])
    member_ships[:data].each do |entry|
      MemberShip.destroy(entry[:id])
      NotificationDeliveryWorker.perform_async({
                                                   event_type: :leave,
                                                   sender_type: :Group,
                                                   sender_id: @group[:id],
                                                   user_id: entry[:user_id],
                                                   type: :System
                                               }) if entry[:user_id] != current_user.id
    end
    render :show
  end

  private

  def query_params
    params.permit(:ids, :name, :owner_id, :owner_ids, :owner_type, :include, :limit, :page)
  end

end