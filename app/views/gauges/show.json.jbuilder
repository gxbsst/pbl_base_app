if @gauge.success?
  json.data do
    json.extract! @gauge, :id, :level_1, :level_2, :level_3, :level_4, :level_5, :level_6, :level_7, :technique_id
  end
else
  json.extract! @gauge, :code, :body, :headers
end