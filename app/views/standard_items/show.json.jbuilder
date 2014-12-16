if @standard_item.success?
  json.data do
    json.extract! @standard_item, :id, :project_id, :standard_item_id
  end
else
  json.extract! @standard_item, :code, :body, :headers
end