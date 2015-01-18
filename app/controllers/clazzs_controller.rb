class ClazzsController < ApplicationController

  def index
    @clazzs = Clazz.all
  end

  def create
    @clazz = Clazz.create(params[:clazz])
    render :show
  end

  def show
    @clazz = Clazz.find(params[:id])
  end

  def update
    @clazz = Clazz.update(params[:id], params[:clazz])
    render :show
  end

  def destroy
    @clazz = Clazz.destroy(params[:id])
    render :show
  end

end