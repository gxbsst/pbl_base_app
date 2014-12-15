if @project.success?
  json.data do
    json.extract! @project, :id, :name, :driven_issue, :standard_analysis, :duration
  end
else
  json.extract! @project, :code, :body, :headers
end