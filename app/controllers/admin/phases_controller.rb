module Admin
  class PhasesController < AdminController

    def index
      @phases = Curriculum::Phase.all(include: 'subjects', page: params[:page], limit: params[:limit])
    end

    def new
      @phase = Curriculum::Phase.new
    end

    def create
      @phase = Curriculum::Phase.create(params[:phase])
      redirect_to admin_phases_path
    end

    def show
      @phase = Curriculum::Phase.find(params[:id])
    end
    
    def edit
      set_phase
    end

    def update
      @phase = Curriculum::Phase.update(params[:id], params[:phase])
      redirect_to admin_phases_path
    end

    def destroy
      @phase = Curriculum::Phase.destroy(params[:id])
      redirect_to admin_phases_path
    end
    
    private

    def set_phase
      @phase = Curriculum::Phase.find(params[:id])
    end
    
  end
end