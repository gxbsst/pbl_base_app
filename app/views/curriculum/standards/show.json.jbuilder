if @standard.success?
  json.data do
    json.extract! @standard, :id, :title, :position, :phases_id
    json.items do
      json.array! @standard.items
    end
  end
else
  json.extract! @standard, :code, :body, :headers
end