class ProductFormsController < ApplicationController

  def index
    @products = ProductForm.all(product_query_params)
  end

  def create
    @product = ProductForm.create(params[:product])
    render :show
  end

  def show
    @product = ProductForm.find(params[:id])
  end

  def update
    @product = ProductForm.update(params[:id], params[:product])
    render :show
  end

  def destroy
    @product = ProductForm.destroy(params[:id])
    render :show
  end

  private

  def product_query_params
    params.permit(:project_id)
  end

end