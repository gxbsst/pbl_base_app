class DisciplinesController < ApplicationBaseController

  def index
    @disciplines = Pbl::Models::Projects::Discipline.all
  end

  def create
    @discipline = Pbl::Models::Projects::Discipline.create(params[:discipline])
    render :show
  end

  def show
    @discipline = Pbl::Models::Projects::Discipline.find(params[:id])
  end

  def update
    @discipline = Pbl::Models::Projects::Discipline.update(params[:id], params[:discipline])
    render :show
  end

  def destroy
    @discipline = Pbl::Models::Projects::Discipline.destroy(params[:id])
    render :show
  end

end