module Admin
  class StandardsController < AdminController

    def index
      @standards = Curriculum::Standard.all(include: 'phases', page: params[:page], limit: params[:limit])
      @standards[:data].each do |standard|
        standard[:subject] = Curriculum::Subject.find(standard[:phase][:subject_id]) if standard[:phase] && standard[:phase][:subject_id]
      end
    end

    def new
      @standard = Curriculum::Standard.new
    end

    def create
      @standard = Curriculum::Standard.create(params[:standard])
      redirect_to admin_standards_path
    end

    def show
      @standard = Curriculum::Standard.find(params[:id])
    end
    
    def edit
      set_standard
    end

    def update
      @standard = Curriculum::Standard.update(params[:id], params[:standard])
      redirect_to admin_standards_path
    end

    def destroy
      @standard = Curriculum::Standard.destroy(params[:id])
      redirect_to admin_standards_path
    end
    
    private

    def set_standard
      @standard = Curriculum::Standard.find(params[:id])
    end
    
  end
end