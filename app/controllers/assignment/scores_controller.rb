module Project
  class ScoresController < ApplicationController

    def index
      @scores = Pbl::Models::Projects::Score.where(params.permit(:work_id, :include))
    end

    def create
      @score = Pbl::Models::Projects::Score.create(params[:work])
      render :show
    end

    def show
      @score = Pbl::Models::Projects::Score.find(params[:id])
    end

    def update
      @score = Pbl::Models::Projects::Score.update(params[:id], params[:task])
      render :show
    end

    def destroy
      @score = Pbl::Models::Projects::Score.destroy(params[:id])
      render :show
    end

  end
end