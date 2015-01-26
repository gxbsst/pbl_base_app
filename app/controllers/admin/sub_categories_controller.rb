module Admin
  class SubCategoriesController < AdminController

    def index
      @sub_categories = Skills::SubCategory.all(include: 'sub_sub_categories', page: params[:page])
      @sub_categories[:data].each do |sub_category|
        sub_category[:sub_category] = Skills::SubCategory.find(sub_category[:sub_sub_category][:sub_category_id])
      end
    end

    def new
      @sub_category = Skills::SubCategory.new
    end

    def create
      @sub_category = Skills::SubCategory.create(params[:sub_category])
      redirect_to admin_sub_categories_path
    end

    def show
      set_sub_category
    end

    def edit
      set_sub_category
    end

    def update
      @sub_category = Skills::SubCategory.update(params[:id], params[:sub_category])
      redirect_to admin_sub_categories_path
    end

    def destroy
      @sub_category = Skills::SubCategory.destroy(params[:id])
      redirect_to admin_sub_categories_path
    end

    private

    def set_sub_category
      @sub_category = Skills::SubCategory.find(params[:id])
    end

  end
end