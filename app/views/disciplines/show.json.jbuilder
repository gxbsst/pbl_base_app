if @discipline.success?
  json.data do
    json.extract! @discipline, :id, :name
  end
else
  json.extract! @discipline, :code, :body, :headers
end