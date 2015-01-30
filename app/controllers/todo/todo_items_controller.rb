module Todo
  class TodoItemsController < ApplicationController

    def index
      @todo_items = Pbl::Models::Todo::TodoItem.where(params.permit(:todo_item_id))
    end

    def create
      @todo_item = Pbl::Models::Todo::TodoItem.create(params[:todos])
      render :show
    end

    def show
      @todo_item = Pbl::Models::Todo::TodoItem.find(params[:id])
    end

    def update
      @todo_item = Pbl::Models::Todo::TodoItem.update(params[:id], params[:todo_item])
      render :show
    end

    def destroy
      @todo_item = Pbl::Models::Todo::TodoItem.destroy(params[:id])
      render :show
    end

  end
end