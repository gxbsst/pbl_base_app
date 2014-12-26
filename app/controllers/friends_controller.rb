class FriendsController < UserController

  def index
    @users = Pbl::Models::Rule.where(user_id: current_user.id)
  end

end