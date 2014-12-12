json.data do
  json.extract! @sub_category, :id, :name
  json.techniques @sub_category.techniques if params[:include] == 'techniques'
end