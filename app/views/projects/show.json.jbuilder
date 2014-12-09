if @project.success?
  json.extract! @project, :id
else
  json.extract! @project, :code, :body, :headers
end