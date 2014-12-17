if @technique.success?
  json.data do
    json.extract! @technique, :id, :project_id, :technique_id
  end
else
  json.extract! @technique, :code, :body, :headers
end