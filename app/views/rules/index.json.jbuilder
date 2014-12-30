json.data do
  json.partial! 'gauges/gauge', collection: @rules.data, :as => :gauge
end if @rules
json.meta @rules.meta if @rules