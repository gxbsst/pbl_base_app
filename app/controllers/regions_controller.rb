class RegionsController < ApplicationBaseController

  def index
    @regions = Region.all(type: params[:type], parent_id: params[:parent_id])
  end

  def create
    @region = Region.create(params[:region])
    render :show
  end

  def show
    @region = Region.find(params[:id], include: params[:include])
  end

  def update
    @region = Region.update(params[:id], params[:region])
    render :show
  end

  def destroy
    @region = Region.destroy(params[:id])
    render :show
  end
  
end