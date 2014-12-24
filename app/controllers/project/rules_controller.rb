module Project
  class RulesController < ApplicationController

    def index
      @rules = Pbl::Rule.all(params.permit(:project_id, :include))
    end

    def create
      @rule = Pbl::Rule.create(params[:rule])
      render :show
    end

    def show
      @rule = Pbl::Rule.find(params[:id])
    end

    def update
      @rule = Pbl::Rule.update(params[:id], params[:rule])
      render :show
    end

    def destroy
      @rule = Pbl::Rule.destroy(params[:id])
      render json: @rule.success? ? {id: @rule.id} : {error: @rule.error}
    end

  end
end