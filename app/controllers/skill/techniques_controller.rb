class Skill::TechniquesController < ApplicationController

  def index
    @techniques = Skills::Technique.all
  end

  def create
    @technique = Skills::Technique.create(params[:technique])
    render :show
  end

  def show
    if params[:include]
      @technique = Skills::Techniquey.find(params[:id], include: params[:include])
    else
      @technique = Skills::Techniquey.find(params[:id])
    end
  end

  def update
    @technique =  Skills::Technique.update(params[:id], params[:technique])
    render :show
  end

  def destroy
    @technique =  Skills::Technique.destroy(params[:id])
    render :show
  end

end