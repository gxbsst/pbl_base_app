class Skill::SubCategoriesController < ApplicationBaseController

  def index
    @sub_categories = Skills::SubCategory.where(params.permit(:category_id))
  end

  def create
    @sub_category = Skills::SubCategory.create(params[:sub_category])
    render :show
  end

  def show
    @sub_category = Skills::SubCategory.find(params[:id], include_param)
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