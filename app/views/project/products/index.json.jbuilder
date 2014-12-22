json.data do
  json.partial! 'project/products/product', collection: @products.data, :as => :product
end if @products
json.meta @products.fetch(:meta) if @products