module Project
  class WorksController < ApplicationController

    def index
      @works = Pbl::Models::Projects::Work.where(params.permit(:task_id, :include))
    end

    def create
      @work = Pbl::Models::Projects::Work.create(params[:work])
      render :show
    end

    def show
      @work = Pbl::Models::Projects::Work.find(params[:id])
    end

    def update
      @work = Pbl::Models::Projects::Work.update(params[:id], params[:task])
      render :show
    end

    def destroy
      @work = Pbl::Models::Projects::Work.destroy(params[:id])
      render :show
    end

  end
end