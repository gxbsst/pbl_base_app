class ProductFormsController < ApplicationController

  def index
    @product_forms = Pbl::ProductForm.all
  end

  def create
    @product_form = Pbl::ProductForm.create(params[:product_form])
    render :show
  end

  def show
    @product_form = Pbl::ProductForm.find(params[:id])
  end

  def update
    @product_form = Pbl::ProductForm.update(params[:id], params[:product_form])
    render :show
  end

  def destroy
    @product_form = Pbl::ProductForm.destroy(params[:id])
    render :show
  end

end