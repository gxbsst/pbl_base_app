json.technique_id technique[:technique_id]
json.gauges do
  json.partial! 'gauges/gauge', collection: technique[:gauges], :as => :gauge
end if technique[:gauges]