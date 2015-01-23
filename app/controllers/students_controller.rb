class StudentsController < ApplicationController

  def index
    @students = Student.where(query_params)
  end

  def create
    student = params[:student]
    if params[:type] === :Student
      students = Student.where(user_id: student[:user_id])
      students[:data].each do |entry|
        FriendShip.destroy(entry[:id])
      end
    end
    @student = Student.create(student)
    if @student.success?
      students = Student.where(clazz_id: @student[:clazz_id])
      friend_ship = []
      students[:data].each do |entry|
        friend_ship.push({
                             user_id: @student[:user_id],
                             friend_id: entry[:user_id]
                         }) if @student[:user_id] != entry[:user_id]
      end
      FriendShip.create(friend_ship)
    end
    render :show
  end

  def show
    @student = Student.find(params[:id])
  end

  def update
    @student = Student.update(params[:id], params[:student])
    render :show
  end

  def destroy
    @student = Student.destroy(params[:id])
    render :show
  end

  private

  def query_params
    params.permit(:clazz_id, :user_id, :include, :limit, :page)
  end

end