class RegionsController < ApplicationBaseController

  def index
    @regions = Pbl::Models::Region.all
  end

  def create
    @region = Pbl::Models::Region.create(params[:region])
    render :show
  end

  def show
    @region = Pbl::Models::Region.find(params[:id])
  end

  def update
    @region = Pbl::Models::Region.update(params[:id], params[:region])
    render :show
  end

  def destroy
    @region = Pbl::Models::Region.destroy(params[:id])
    render :show
  end
  
end