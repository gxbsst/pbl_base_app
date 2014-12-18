module Project
  class ProductsController < ApplicationController

    def index
      @products = Pbl::Product.all(product_query_params)
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

    private

    def product_query_params
      params.permit(:project_id, :include)
    end

  end
end