if @standard.success?
  json.data do
    json.extract! @standard, :id, :title, :position, :phases_id
    json.items @standard.items if params[:include] == 'items'
  end
else
  json.extract! @standard, :code, :body, :headers
end