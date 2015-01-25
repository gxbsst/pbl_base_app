class StepsController < UserController

  def index
    @step = Step.find_by_user_id(params[:user_id] || current_user.id)
    render :show
  end

  def create
    step = params[:step]
    step[:user_id] = current_user.id
    @step = Step.find_by_user_id(step[:user_id])
    if @step
      @step.update(step_params)
      head :ok
    else
      @step = Step.new(step_params)
      if @step.save
        head :created
      else
        render json: @step.errors.full_messages, status: :unprocessable_entity
      end
    end
  end

  private

    def step_params
      params.require(:step).permit(:user_id, :current_step)
    end
end
