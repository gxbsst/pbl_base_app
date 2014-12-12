if @phase.success?
  json.data do
    json.extract! @phase, :id, :name, :position, :subject_id
    json.standards do
      json.array! @phase.standards
    end
  end
else
  json.extract! @phase, :code, :body, :headers
end