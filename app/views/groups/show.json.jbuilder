if @group.success?
  json.data do
    json.extract! @group, :id, :name
  end
else
  json.extract! @group, :code, :body, :headers
end