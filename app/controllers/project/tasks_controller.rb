module Project
  class TasksController < ApplicationController

    def index
      @tasks = Pbl::Models::Projects::Task.where(params.permit(:project_id, :include))
    end

    def create
      @task = Pbl::Models::Projects::Task.create(params[:task])
      render :show
    end

    def show
      @task = Pbl::Models::Projects::Task.find(params[:id])
    end

    def update
      @task = Pbl::Models::Projects::Task.update(params[:id], params[:task])
      render :show
    end

    def destroy
      @task = Pbl::Models::Projects::Task.destroy(params[:id])
      render :show
    end

    def release
      @task = Pbl::Models::Projects::Task.release(params[:id])
      render :show
    end

  end
end