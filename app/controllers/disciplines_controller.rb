class DisciplinesController < ApplicationBaseController

  def index
    @disciplines = Pbl::Discipline.all
  end

  def create
    @discipline = Pbl::Discipline.create(params[:discipline])
    render :show
  end

  def show
    @discipline = Pbl::Discipline.find(params[:id])
  end

  def update
    @discipline = Pbl::Discipline.update(params[:id], params[:discipline])
    render :show
  end

  def destroy
    @discipline = Pbl::Discipline.destroy(params[:id])
    render :show
  end

end