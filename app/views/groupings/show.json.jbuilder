if @grouping
  json.extract! @grouping, :id, :project_id, :cache
else
  json.error 404
end