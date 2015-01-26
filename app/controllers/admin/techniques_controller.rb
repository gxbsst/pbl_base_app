module Admin
  class TechniquesController < AdminController

    def index
      @techniques = Skills::Technique.all(include: 'sub_categories', page: params[:page])
      @techniques[:data].each do |technique|
        technique[:category] = Skills::Category.find(technique[:sub_category][:category_id]) if technique[:sub_category]
      end
    end

    def new
      @technique = Skills::Technique.new
    end

    def create
      @technique = Skills::Technique.create(params[:technique])
      redirect_to admin_techniques_path
    end

    def show
      set_technique
    end

    def edit
      set_technique
    end

    def update
      @technique = Skills::Technique.update(params[:id], params[:technique])
      redirect_to admin_techniques_path
    end

    def destroy
      @technique = Skills::Technique.destroy(params[:id])
      redirect_to admin_techniques_path
    end

    private

    def set_technique
      @technique = Skills::Technique.find(params[:id])
    end

  end
end