class ResourcesController < ApplicationBaseController

  def index
    @resources = Resource.all(ids: params[:ids], owner_types: params[:owner_types], owner_ids: params[:owner_ids], limit: params[:limit])
  end

  def create
    resource = params[:resource]
    resource[:user_id] ||= current_user.id
    @resource = Resource.create(resource)
    render :show
  end

  def show
    @resource = Resource.find(params[:id])
  end

  def update
    @resource = Resource.update(params[:id], params[:resource])
    render :show
  end

  def destroy
    @resource = Resource.destroy(params[:id])
    render :show
  end

end