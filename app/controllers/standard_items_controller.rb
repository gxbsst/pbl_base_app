class StandardItemsController < ApplicationBaseController

  def index
    @standard_items = Pbl::StandardItem.all(params.permit(:project_id))
  end

  def create
    @standard_item = Pbl::StandardItem.create(params[:standard_item])
    render :show
  end

  def show
    @standard_item = Pbl::StandardItem.find(params[:id])
  end

  def update
    @standard_item = Pbl::StandardItem.update(params[:id], params[:standard_item])
    render :show
  end

  def destroy
    @standard_item = Pbl::StandardItem.destroy(params[:id])
    render :show
  end
  
end