module Assignment
  class WorksController < ApplicationController

    def index
      @works = Pbl::Models::Assignments::Work.where(params.permit(:work_id, :task_id, :task_type, :include ,:state, :limit))
    end

    def create
      @work = Pbl::Models::Assignments::Work.create(params[:work])
      render :show
    end

    def show
      @work = Pbl::Models::Assignments::Work.find(params[:id])
    end

    def update
      @work = Pbl::Models::Assignments::Work.update(params[:id], params[:work])
      render :show
    end

    def destroy
      @work = Pbl::Models::Assignments::Work.destroy(params[:id])
      render :show
    end

  end
end