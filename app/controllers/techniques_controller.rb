class TechniquesController < ApplicationBaseController
  
  def index
    @techniques = Pbl::Technique.all(params.permit(:project_id))
  end

  def create
    @technique = Pbl::Technique.create(params[:technique])
    render :show
  end

  def show
    @technique = Pbl::Technique.find(params[:id])
  end

  def update
    @technique = Pbl::Technique.update(params[:id], params[:technique])
    render :show
  end

  def destroy
    @technique = Pbl::Technique.destroy(params[:id])
    render :show
  end
  
end