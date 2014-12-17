# encoding: utf-8

class KnowledgeController < ApplicationBaseController

  def index
    @all_knowledge = Pbl::Knowledge.all(params.permit(:project_id))
  end

  def create
    @knowledge = Pbl::Knowledge.create(params[:knowledge])
    render :show
  end

  def show
    @knowledge = Pbl::Knowledge.find(params[:id])
  end

  def update
    @knowledge = Pbl::Knowledge.update(params[:id], params[:knowledge])
    render :show
  end

  def destroy
    @knowledge = Pbl::Knowledge.destroy(params[:id])
    render json: {id: @knowledge.id}
  end

end