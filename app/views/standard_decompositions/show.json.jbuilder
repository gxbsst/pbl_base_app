if @standard_decomposition.success?
  json.data do
    json.extract! @standard_decomposition, :id, :role, :verb, :technique, :noun, :product_name, :product_id
  end
else
  json.extract! @standard_decomposition, :code, :body, :headers
end