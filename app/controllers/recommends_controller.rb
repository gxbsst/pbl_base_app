class RecommendsController < ApplicationController

  def index
    @gauges = Pbl::Models::Gauge.recommends(limit: params[:limit] || 3, technique_ids: params[:technique_ids])
  end

end