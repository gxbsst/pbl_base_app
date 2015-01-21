class ClazzsController < ApplicationController

  def index
    @clazzs = Clazz.all(clazz_query_params)
  end

  def create
    clazz = params[:clazz]
    clazz[:user_id] ||= current_user.id
    @clazz = Clazz.create(clazz)
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

  private

  def clazz_query_params
    params.permit(:grade_id, :school_id, :include, :limit)
  end

end