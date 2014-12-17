class ProductFormsController < ApplicationController

  def index
    @products = Pbl::Models::Projects::ProductForm.all
  end

  def create
    @product = Pbl::Models::Projects::ProductForm.create(params[:product])
    render :show
  end

  def show
    @product = Pbl::Models::Projects::ProductForm.find(params[:id])
  end

  def update
    @product = Pbl::Models::Projects::ProductForm.update(params[:id], params[:product])
    render :show
  end

  def destroy
    @product = Pbl::Models::Projects::ProductForm.destroy(params[:id])
    render :show
  end

end