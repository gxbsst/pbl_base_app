class Skill::TechniquesController < ApplicationBaseController

  def index
    @techniques = Skills::Technique.where(params.permit(:sub_category_id, :limit))
  end

  def create
    @technique = Skills::Technique.create(params[:technique])
    render :show
  end

  def show
    @technique = Skills::Technique.find(params[:id], include_param)
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