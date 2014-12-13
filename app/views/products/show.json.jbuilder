if @product.success?
  json.data do
    json.extract! @product, :id, :form, :description, :is_final, :project_id
  end
else
  json.extract! @product, :code, :body, :headers
end