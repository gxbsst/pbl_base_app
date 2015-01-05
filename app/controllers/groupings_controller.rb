class GroupingsController < ApplicationController

  def index
    @groupings = Grouping.all
  end

  def show
    set_grouping
  end

  def create
    @grouping = Grouping.find_by_project_id(params[:grouping][:project_id])
    if @grouping
      @grouping.update(grouping_params)
      head :ok
    else
      @grouping = Grouping.new(grouping_params)
      if @grouping.save
        head :created
      else
        render json: @grouping.errors.full_messages, status: :unprocessable_entity
      end
    end
  end

  def update
    set_grouping
    @grouping.update(grouping_params)
    head :ok
  end

  def destroy
    @grouping.destroy
    head :ok
  end

  private
    def set_grouping
      @grouping = Grouping.find_by_project_id(params[:id])
    end

    def grouping_params
      params.require(:grouping).permit(:project_id, :cache)
    end
end
