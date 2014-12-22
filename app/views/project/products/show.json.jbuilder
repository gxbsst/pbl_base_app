if @product.success?
  json.data do
    json.partial! 'project/products/product', product: @product
  end
else
  json.extract! @product, :code, :body, :headers
end