class AssignmentsController < ApplicationController

  def index
    assignment = {}
    if params[:project_id]
      assignment[:resource_type] = 'Project'
      assignment[:resource_id] = params[:project_id]
      assignment[:name] = params[:name]
    end
    @assignments = Pbl::Models::Assignment.where(assignment)
  end

  def create

    assignment = params[:assignment]

    if params[:project_id] && params[:user_ids]
      assignments = []
      params[:user_ids].split(',').each do |user_id|
        item = { user_id: user_id }
        item[:resource_type] = 'Project'
        item[:resource_id] = params[:project_id]
        item[:name] = params[:name]
        assignments.push item
      end
      assignment = assignments
    end

    @assignment = Pbl::Models::Assignment.create(assignment)
    head :ok
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