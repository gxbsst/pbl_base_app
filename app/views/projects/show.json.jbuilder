if @project.success?
  json.data do
    json.partial! 'projects/project', project: @project
  end
else
  json.extract! @project, :code, :body, :headers
end