class FriendsController < ApplicationController

  def index
    @user = User.find(current_user.id, include: 'friends')
  end

end