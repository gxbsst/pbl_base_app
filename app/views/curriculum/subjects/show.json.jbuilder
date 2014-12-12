if @subject.success?
  json.data do
    json.id @subject.id
    json.name @subject.name
    json.position @subject.position
    json.phases do
      json.array! @subject.phases
    end
  end
else
  json.extract! @subject, :code, :body, :headers
end