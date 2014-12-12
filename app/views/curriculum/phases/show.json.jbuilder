if @phase.success?
  json.data do
    json.id @phase.id
    json.name @phase.name
    json.position @phase.position
    json.subject_id @phase.subject_id
    json.standards do
      json.array! @phase.standards
    end
  end
else
  json.extract! @phase, :code, :body, :headers
end