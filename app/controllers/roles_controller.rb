class RolesController < ApplicationController

  def index
    @roles = Role.all
  end

  def create
    @role = Role.create(params[:role])
    render :show
  end

  def show
    @role = Role.find(params[:id])
  end

  def update
    @role = Role.update(params[:id], params[:role])
    render :show
  end

  def destroy
    @role = Role.destroy(params[:id])
    render :show
  end

end