json.data do
  if @knowledge
    json.id @knowledge.id if @knowledge.id
    json.description @knowledge.id if @knowledge.description
    json.project_id @knowledge.project_id if @knowledge.project_id
  end
end