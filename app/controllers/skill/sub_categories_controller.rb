class Skill::SubCategoriesController < ApplicationController

  def index
    @sub_categories = Skills::SubCategory.all
  end

  def create
    @sub_category = Skills::SubCategory.create(params[:sub_category])
    render :show
  end

  def show
    if params[:include]
      @sub_category = Skills::SubCategory.find(params[:id], include: params[:include])
    else
      @sub_category = Skills::SubCategory.find(params[:id])
    end
  end

  def update
    @sub_category =  Skills::SubCategory.update(params[:id], params[:sub_category])
    render :show
  end

  def destroy
    @sub_category =  Skills::SubCategory.destroy(params[:id])
    render :show
  end

end