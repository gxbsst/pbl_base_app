class MessagesController < ApplicationController

  def index
    @messages = Message.all
  end

  def user_index
    params[:user_id] = params[:user_id] || current_user.id
    params[:include] = ((params[:include] || '').split(',') << 'sender').join(',')
    @messages = Message.where(query_params)
    render :index
  end

  def create
    @message = Message.create(params[:message])
    render :show
  end

  def show
    @message = Message.find(params[:id])
  end

  def update
    @message = Message.update(params[:id], params[:message])
    render :show
  end

  def destroy
    @message = Message.destroy(params[:id])
    render :show
  end

  private

  def query_params
    params.permit(:owner_type, :owner_id, :user_id, :sender_id, :include, :limit, :page)
  end

end