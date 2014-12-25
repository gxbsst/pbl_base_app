if @rule.success?
  json.data do
    json.extract! @rule, :id, :weight, :level_1, :level_2, :level_3, :level_4, :level_5, :project_id, :technique_id, :gauge_id, :standard
  end
else
  json.extract! @rule, :code, :body, :headers
end