json.id product.id
json.title product.title if product.title
json.is_final product.is_final if product.is_final
json.project_id product.project_id if product.project_id
json.product_form do
  json.partial! 'product_forms/product_form', product_form: product.product_form
end if product.product_form
json.product_form_id product.product_form_id if product.product_form_id