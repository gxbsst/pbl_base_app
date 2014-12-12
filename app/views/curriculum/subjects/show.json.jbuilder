if @subject.success?
  json.data do
    json.extract! @subject, :id, :name, :position
    json.phases do
      json.array! @subject.phases
    end
  end
else
  json.extract! @subject, :code, :body, :headers
end