if @work.success?
  json.data do
    json.partial! 'assignment/works/work', work: @work
  end
else
  json.extract! @work, :code, :body, :headers
end