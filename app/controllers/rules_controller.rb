class RulesController < ApplicationBaseController

  def index
    @rules = Pbl::Rule.where(user_id: current_user.id, include: 'techniques')
  end

end