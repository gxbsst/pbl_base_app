class ClazzsController < ApplicationController

  def index
    @clazzs = Clazz.all(clazz_query_params)
  end

  def user_clazzs
    students = Student.all(user_id: params[:user_id] || current_user.id)
    ids = students[:data].map(&:clazz_id).join(',')
    return render 'share/empty' if ids.empty?
    @clazzs = Clazz.where(ids: ids)
    render :index
  end

  def create
    clazz = params[:clazz]
    clazz[:user_id] ||= current_user.id
    @clazz = Clazz.create(clazz)
    group = {
        owner_type: :Clazz,
        owner_id: @clazz[:id]
    }
    @group = Group.create(group)
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
    params.permit(:ids, :grade_id, :school_id, :include, :limit)
  end

end