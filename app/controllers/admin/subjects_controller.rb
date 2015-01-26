module Admin
  class SubjectsController < AdminController

    def index
      @subjects = Curriculum::Subject.all(page: params[:page])
    end

    def new
      @subject = Curriculum::Subject.new
    end

    def create
      @subject = Curriculum::Subject.create(params[:subject])
      redirect_to admin_subjects_path
    end

    def show
      @subject = Curriculum::Subject.find(params[:id])
    end
    
    def edit
      set_subject
    end

    def update
      @subject = Curriculum::Subject.update(params[:id], params[:subject])
      redirect_to admin_subjects_path
    end

    def destroy
      @subject = Curriculum::Subject.destroy(params[:id])
      redirect_to admin_subjects_path
    end
    
    private

    def set_subject
      @subject = Curriculum::Subject.find(params[:id])
    end
    
  end
end