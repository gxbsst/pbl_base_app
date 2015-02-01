class NotificationsController < ApplicationController

  def index
    @notifications = Notification.where(region_id: params[:region_id], limit: 50)
  end

  def create
    notification = params[:notification]
    notification[:user_id] ||= current_user.id
    @notification = Notification.create(notification)
    render :show
  end

  def show
    @notification = Notification.find(params[:id])
  end

  def update
    @notification = Notification.update(params[:id], params[:notification])
    render :show
  end

  def destroy
    @notification = Notification.destroy(params[:id])
    render :show
  end

end