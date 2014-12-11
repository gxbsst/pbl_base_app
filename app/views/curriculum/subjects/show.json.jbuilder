if @subject.success?
  json.data do
    json.extract! @subject
  end
else
  json.extract! @subject, :code, :body, :headers
end