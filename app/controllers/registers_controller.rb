class RegistersController < ApplicationController

  def create
    @user = User.create(params[:user])
    render 'users/show'
  end

end