class NotificationsController < ApplicationController

  def index
    @notifications = Notification.all
  end

  def user_notifies_index
    params[:type] = :System
    params[:user_id] = current_user.id
    @notifications = Notification.where(query_params)
    @notifications[:data].each do |notification|
      case notification[:sender_type]
        when 'Clazz'
          notification[:group] = Group.find_by(:owner_id => notification[:sender_id], :include => 'clazzs')
        when 'Group'
          notification[:group] = Group.find(notification[:sender_id])
        when 'User'
          notification[:user] = User.find(notification[:sender_id])
        when 'Post'
          notification[:post] = Post.find(notification[:sender_id])
        else
      end
      notification[:additional_info].clone.each do |key, value|
        case key
          when :user_id
            user = User.find(value)
            if user.success?
              notification[:additional_info][:user] = user
              notification[:additional_info].delete(:user_id)
            end
          else
        end
      end if notification[:additional_info]
    end if @notifications[:data]
    render :index
  end

  def user_notifies_count
    params[:type] = :System
    params[:user_id] = current_user.id
    @count = Notification.find(:count, query_params)
    render :count
  end

  def user_sms_index
    params[:type] = :User
    params[:user_id] = current_user.id
    @notifications = Notification.where(query_params)
    render :index
  end

  def user_sms_count
    @count = Notification.find(:count, query_params)
    render :count
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
    notification = Notification.update(params[:notification_id], :read => true)
    params[:type] = notification[:type]
    params[:user_id] = notification[:user_id]
    @count = Notification.find(:count, query_params)
    render :count
  end

  def update
    @notification = Notification.update(params[:id], params[:notification])
    render :show
  end

  def destroy
    Notification.destroy(params[:id])
    @count = Notification.find(:count, query_params)
    render :count
  end

  private

  def query_params
    params.permit(:user_id, :type, :types, :sender_type, :sender_id, :sender_types, :sender_ids, :read, :include, :limit, :page)
  end

end