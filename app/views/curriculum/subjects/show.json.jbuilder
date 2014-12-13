if @subject.success?
  json.data do
    json.extract! @subject, :id, :name, :position
    json.phases @subject.phases if params[:include] == 'phases'
  end
else
  json.extract! @subject, :code, :body, :headers
end