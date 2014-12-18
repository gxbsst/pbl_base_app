class ResourcesController < ApplicationBaseController

  def index
    @resources = Pbl::Models::Resource.all
  end

  def create
    @resource = Pbl::Models::Resource.create(params[:resource])
    render :show
  end

  def show
    @resource = Pbl::Models::Resource.find(params[:id])
  end

  def update
    @resource = Pbl::Models::Resource.update(params[:id], params[:resource])
    render :show
  end

  def destroy
    @resource = Pbl::Models::Resource.destroy(params[:id])
    render :show
  end

end