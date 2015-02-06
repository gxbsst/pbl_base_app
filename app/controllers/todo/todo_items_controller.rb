module Todo
  class TodoItemsController < ApplicationController

    def index
      @todo_items = Pbl::Models::Todo::TodoItem.where(params.permit(:todo_item_id, :user_id, :limit))
    end

    def create
      @todo_item = Pbl::Models::Todo::TodoItem.create(params[:todo_item])
      render :show
    end

    def show
      @todo_item = Pbl::Models::Todo::TodoItem.find(params[:id])
    end

    def update
      @todo_item = Pbl::Models::Todo::TodoItem.update(params[:id], params[:todo_item])
      render :show
    end

    def complete
      @todo_item = Pbl::Models::Todo::TodoItem.complete(params[:id])
      render :show
    end

    def cancel_complete
      @todo_item = Pbl::Models::Todo::TodoItem.cancel_complete(params[:id])
      render :show
    end

    def destroy
      @todo_item = Pbl::Models::Todo::TodoItem.destroy(params[:id])
      render :show
    end

  end
end