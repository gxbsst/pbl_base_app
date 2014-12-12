class Skill::TechniquesController < ApplicationController

  def index
    @techniques = Skills::Technique.all
  end

  def create
    @technique = Skills::Technique.create(params[:technique])
    render :show
  end

  def show
    @technique = Skills::Techniquey.find(params[:id])
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