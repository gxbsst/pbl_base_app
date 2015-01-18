class InvitationsController < ApplicationController

  def index
    @invitations = Invitation.all
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