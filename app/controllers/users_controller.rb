class UsersController < UserController

  before_action :authenticate_user!, except: :create
  before_filter :set_user, except: :create

  def index
    @users = User.all(user_query_params)
  end

  def create
    user = params[:user]
    group_code = user[:group_code]
    user.delete(:group_code) if group_code
    parent_code = user[:parent_code]
    user.delete(:parent_code) if parent_code
    @user = User.create(user)
    if @user.success?
      id = @user[:id]
      case @user[:type]
        when 'Student'
          invitation = {
              owner_type: :Student,
              owner_id: id
          }
          @invitation = Invitation.create(invitation)
          if group_code.present?
            invitations = Invitation.where(code: group_code)
            invitations[:data].each do |invitation|
              case invitation[:owner_type]
                when 'Clazz'
                  student = Student.create({
                                                user_id: id,
                                                clazz_id: invitation[:owner_id]
                                            })
                  if student.success?
                    students = Student.where(clazz_id: student[:clazz_id])
                    friend_ship = []
                    students[:data].each do |entry|
                      friend_ship.push({
                                           user_id: student[:user_id],
                                           friend_id: entry[:user_id]
                                       }) if student[:user_id] != entry[:user_id]
                    end
                    FriendShip.create(friend_ship) unless friend_ship.empty?
                  end
                when 'Group'
                  MemberShip.create({
                                        user_id: id,
                                        group_id: invitation[:owner_id]
                                    })
                else
              end
            end
          end
        when 'Parent'
          if parent_code.present?
            invitations = Invitation.where(code: parent_code)
            invitations[:data].each do |invitation|
              FriendShip.create({
                                    user_id: id,
                                    friend_id: invitation[:owner_id],
                                    relation: '0'
                                })
            end
          end
        else
      end
    end
    render :show
  end

  def show
    set_user
  end

  def update
    id = params[:id]
    user = params[:user]
    relation = user[:relation]
    if relation
      user.delete(:relation)
      user[:gender] = relation if relation.to_i > 0
      update_friend_ships(id, relation)
    end
    if params[:include]
      id += "?include=#{params[:include]}"
    end
    User.update(id, user)
    set_user
    render :show
  end

  def destroy
    @user = User.destroy(params[:id])
    render :show
  end

  private

  def set_user
    user_id = params[:id] || current_user.id
    @user = User.find(user_id, include: params[:include])
    @step = Step.find_by_user_id(user_id)
  end

  def user_query_params
    params.permit(:username, :include, :limit)
  end

  def update_friend_ship(friend_ships, relation)
    friend_ships[:data].each do |friend_ship|
      FriendShip.update(friend_ship[:id], { relation: relation })
    end
  end

  def update_friend_ships(user_id, relation)
    friend_ships = FriendShip.where(user_id: user_id, relation_null: false)
    update_friend_ship(friend_ships, relation)
    friend_ships = FriendShip.where(friend_id: user_id, relation_null: false)
    update_friend_ship(friend_ships, relation)
  end

end