class InvitationsController < ApplicationController

  def index
    @invitations = Invitation.all
  end

  def current_user_index
    @invitations = Invitation.where(owner_type: :User, owner_id: params[:user_id] || current_user.id)
    render :index
  end

  def regenerate
    if params[:clazz_id].present?
      invitation = {
          owner_type: :Clazz,
          owner_id: params[:clazz_id]
      }
      Invitation.destroy_by(invitation)
      @invitation = Invitation.create(invitation)
      return render :show
    end

    if params[:group_id].present?
      invitation = {
          owner_type: :Group,
          owner_id: params[:group_id]
      }
      Invitation.destroy_by(invitation)
      @invitation = Invitation.create(invitation)
      return render :show
    end
    render 'share/empty'
  end

  def create
    @invitation = Invitation.create(params[:invitation])
    render :show
  end

  def show
    @invitation = Invitation.find(params[:id])
  end

  def update
    @invitation = Invitation.update(params[:id], params[:invitation])
    render :show
  end

  def destroy
    @invitation = Invitation.destroy(params[:id])
    render :show
  end

end