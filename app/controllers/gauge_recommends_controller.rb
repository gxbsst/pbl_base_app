class GaugeRecommendsController < ApplicationController

  def show
    @gauges = Gauge.recommends(limit: params[:limit] || 3, technique_ids: params[:technique_ids])
  end

end