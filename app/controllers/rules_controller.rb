class RulesController < ApplicationBaseController

  def index
    @rules = Pbl::Models::Projects::Rule.where(user_id: current_user.id, include: 'techniques')
  end

end