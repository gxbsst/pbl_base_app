if @project.success?
  json.data do
    json.id @project.id
    json.name @project.name
    json.driven_issue @project.driven_issue
    json.standard_analysis @project.standard_analysis
  end
else
  json.extract! @project, :code, :body, :headers
end