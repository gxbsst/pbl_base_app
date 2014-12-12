json.data do
  json.extract! @category, :id, :name
  json.sub_categories @category.sub_categories if params[:include] == 'sub_categories'
end