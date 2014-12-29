if @gauge.success?
  json.data do
    json.partial! 'gauges/gauge', gauge: @gauge
  end
else
  json.extract! @gauge, :code, :body, :headers
end