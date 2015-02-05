module Admin
  class StandardItemsController < AdminController

    def index
      @standard_items = Curriculum::StandardItem.all(page: params[:page])
      @standard_items[:data].each do |standard_item|
        standard_item[:standard] = Curriculum::Standard.find(standard_item[:standard_id]) if standard_item[:standard_id]
        standard_item[:phase] = Curriculum::Phase.find(standard_item[:standard][:phase_id]) if standard_item[:standard]
        standard_item[:subject] = Curriculum::Subject.find(standard_item[:phase][:subject_id]) if standard_item[:phase]
      end
    end

    def new
      @standard_item = Curriculum::StandardItem.new
    end

    def create
      @standard_item = Curriculum::StandardItem.create(params[:standard_item])
      redirect_to admin_standard_items_path
    end

    def show
      set_standard_item
    end

    def edit
      set_standard_item
    end

    def update
      @standard_item = Curriculum::StandardItem.update(params[:id], params[:standard_item])
      redirect_to admin_standard_items_path
    end

    def destroy
      @standard_item = Curriculum::StandardItem.destroy(params[:id])
      redirect_to admin_standard_items_path
    end

    private

    def set_standard_item
      @standard_item = Curriculum::StandardItem.find(params[:id])
    end

  end
end