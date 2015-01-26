module Admin
  class CategoriesController < AdminController

    def index
      @categories = Skills::Category.all(include: 'sub_categories', page: params[:page])
    end

    def new
      @category = Skills::Category.new
    end

    def create
      @category = Skills::Category.create(params[:category])
      redirect_to admin_categories_path
    end

    def show
      set_category
    end

    def edit
      set_category
    end

    def update
      @category = Skills::Category.update(params[:id], params[:category])
      redirect_to admin_categories_path
    end

    def destroy
      @category = Skills::Category.destroy(params[:id])
      redirect_to admin_categories_path
    end

    private

    def set_category
      @category = Skills::Category.find(params[:id])
    end

  end
end