class AssignmentController

  def index
    @assignments = Pbl::Models::Assignment.all
  end

  def create
    @assignment = Pbl::Models::Assignment.create(params[:assignment])
    render :show
  end

  def show
    @assignment = Pbl::Models::Assignment.find(params[:id])
  end

  def update
    @assignment = Pbl::Models::Assignment.update(params[:id], params[:assignment])
    render :show
  end

  def destroy
    @assignment = Pbl::Models::Assignment.destroy(params[:id])
    render :show
  end
  
end