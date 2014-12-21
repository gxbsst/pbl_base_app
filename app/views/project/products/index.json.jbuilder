#json.extract! @products, :data, :meta if @products

json.data do
  json.partial! 'project/products/product', collection: @products.fetch(:data), :as => :product
end if @products
json.meta @products.fetch(:meta) if @products