if @phase.success?
  json.data do
    json.extract! @phase, :id, :name, :position, :subject_id
    json.standards @phase.standards if params[:include] == 'standards'
  end
else
  json.extract! @phase, :code, :body, :headers
end