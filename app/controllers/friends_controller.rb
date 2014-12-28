class FriendsController < ApplicationController

  def index
    @user = Pbl::Models::Users::User.find(current_user.id, include: 'friends')
  end

end