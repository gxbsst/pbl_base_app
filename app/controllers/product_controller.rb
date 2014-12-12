class ProductController < ApplicationController

  def index
    @products = Pbl::Product.where(params)
  end

  def create
    @product = Pbl::Product.create(params[:product])
    render :show
  end

  def show
    @product = Pbl::Product.find(params[:id])
  end

  def update
    @product = Pbl::Product.update(params[:id], params[:product])
    render :show
  end

  def destroy
    @product = Pbl::Product.destroy(params[:id])
    render :show
  end

end