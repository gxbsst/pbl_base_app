json.array!(@groupings) do |grouping|
  json.extract! grouping, :id, :project_id, :cache
  json.url grouping_url(grouping, format: :json)
end
