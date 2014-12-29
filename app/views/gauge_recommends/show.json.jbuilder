json.data do
  json.partial! 'gauge_recommends/technique', collection: @gauges.data, :as => :technique
end if @gauges