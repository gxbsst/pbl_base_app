json.data do
  json.array! @projects do |project|
    json.id project.id
    json.title project.name
  end
end