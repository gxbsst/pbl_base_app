if @standard.success?
  json.data do
    json.id @standard.id
    json.title @standard.title
    json.position @standard.position
    json.phases_id @standard.phases_id
    json.items do
      json.array! @standard.items
    end
  end
else
  json.extract! @standard, :code, :body, :headers
end