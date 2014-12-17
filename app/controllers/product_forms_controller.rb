class ProductFormsController < ApplicationController

  def index
    @product_forms = Pbl::Models::Projects::ProductForm.all
  end

  def create
    @product_form = Pbl::Models::Projects::ProductForm.create(params[:product_form])
    render :show
  end

  def show
    @product_form = Pbl::Models::Projects::ProductForm.find(params[:id])
  end

  def update
    @product_form = Pbl::Models::Projects::ProductForm.update(params[:id], params[:product_form])
    render :show
  end

  def destroy
    @product_form = Pbl::Models::Projects::ProductForm.destroy(params[:id])
    render :show
  end

end