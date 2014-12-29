json.data do
  json.partial! 'gauges/gauge', collection: @gauges.data, :as => :gauge
end if @gauges
json.meta @gauges.meta if @gauges