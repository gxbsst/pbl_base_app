module Todo
  class TodosController < ApplicationController

    def index
      @todos = Pbl::Models::Todo::Todo.where(params.permit(:todo_id))
    end

    def create
      @todo = Pbl::Models::Todo::Todo.create(params[:todos])
      render :show
    end

    def show
      @todo = Pbl::Models::Todo::Todo.find(params[:id])
    end

    def update
      @todo = Pbl::Models::Todo::Todo.update(params[:id], params[:todos])
      render :show
    end

    def destroy
      @todo = Pbl::Models::Todo::Todo.destroy(params[:id])
      render :show
    end

  end
end