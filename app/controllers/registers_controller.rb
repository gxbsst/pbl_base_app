class RegistersController < ApplicationController

  def create
    @user = Pbl::Models::Users::User.create(params[:user])
    render 'users/show'
  end

end