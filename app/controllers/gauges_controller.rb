class GaugesController < ApplicationBaseController

  def index
    @gauges = Gauge.all()
  end

  def create
    @gauge = Gauge.create(params[:gauge])
    render :show
  end

  def show
    @gauge = Gauge.find(params[:id])
  end

  def update
    @gauge = Gauge.update(params[:id], params[:gauge])
    render :show
  end

  def destroy
    @gauge = Gauge.destroy(params[:id])
    render :show
  end

end