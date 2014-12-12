class Skill::CategoriesController < ApplicationController

  def index
    @categories = Skills::Category.all
  end

  def create
    @category = Skills::Category.create(params[:category])
    render :show
  end

  def show
    @category = Skills::Category.find(params[:id])
  end

  def update
    @category =  Skills::Category.update(params[:id], params[:category])
    render :show
  end

  def destroy
    @category =  Skills::Category.destroy(params[:id])
    render :show
  end

end