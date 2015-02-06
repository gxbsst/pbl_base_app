module Admin
  class GaugesController < AdminController

    def index
      @gauges = Gauge.all(include: 'techniques', page: params[:page], limit: params[:limit])
    end

    def new
      @gauge = Gauge.new
    end

    def create
      @gauge = Gauge.create(params[:gauge])
      redirect_to admin_gauges_path
    end

    def show
      set_gauge
    end

    def edit
      set_gauge
    end

    def update
      @gauge = Gauge.update(params[:id], params[:gauge])
      redirect_to admin_gauges_path
    end

    def destroy
      @gauge = Gauge.destroy(params[:id])
      redirect_to admin_gauges_path
    end

    private

    def set_gauge
      @gauge = Gauge.find(params[:id])
    end

  end
end