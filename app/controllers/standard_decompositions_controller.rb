class StandardDecompositionsController < ApplicationController

  def index
    @standard_decompositions = Pbl::StandardDecomposition.where(params.permit(:project_id))
  end

  def create
    @standard_decomposition = Pbl::StandardDecomposition.create(params[:standard_decomposition])
    render :show
  end

  def show
    @standard_decomposition = Pbl::StandardDecomposition.find(params[:id])
  end

  def update
    @standard_decomposition = Pbl::StandardDecomposition.update(params[:id], params[:standard_decomposition])
    render :show
  end

  def destroy
    @standard_decomposition = Pbl::StandardDecomposition.destroy(params[:id])
    render :show
  end
  
end