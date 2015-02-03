class NotificationsController < ApplicationController

  def index
    @notifications = Notification.all
  end

  def user_notifies_index
    params[:type] = :System
    params[:user_id] = current_user.id
    @notifications = Notification.where(query_params)
    render :index
  end

  def user_sms_index
    params[:type] = :User
    params[:user_id] = current_user.id
    @notifications = Notification.where(query_params)
    render :index
  end

  def user_sms_create
    sms = params[:sms]
    sms[:type] = :User
    sms[:sender_type] = :User
    sms[:sender_id] = current_user.id
    @notification = Notification.create(sms)
    render :show
  end

  def create
    notification = params[:notification]
    notification[:user_id] ||= current_user.id
    @notification = Notification.create(notification)
    render :show
  end

  def show
    @notification = Notification.find(params[:id])
    case @notification[:sender_type]
      when 'Clazz'
        @notification[:clazz] = Clazz.find(@notification[:sender_id])
      when 'Group'
        @notification[:group] = Group.find(@notification[:sender_id])
      when 'User'
        @notification[:user] = User.find(@notification[:sender_id])
      when 'Post'
        @notification[:post] = Post.find(@notification[:sender_id])
      else
    end
  end

  def read
    @notification = Notification.update(params[:id], {read: true})
    case @notification[:sender_type]
      when 'Clazz'
        @notification[:clazz] = Clazz.find(@notification[:sender_id])
      when 'Group'
        @notification[:group] = Group.find(@notification[:sender_id])
      when 'User'
        @notification[:user] = User.find(@notification[:sender_id])
      when 'Post'
        @notification[:post] = Post.find(@notification[:sender_id])
      else
    end
    render :show
  end

  def update
    @notification = Notification.update(params[:id], params[:notification])
    render :show
  end

  def destroy
    @notification = Notification.destroy(params[:id])
    render :show
  end

  private

  def query_params
    params.permit(:user_id, :include, :limit, :page)
  end

end