if @discussion.success?
  json.data do
    json.partial! 'discussions/discussion', discussion: @discussion
  end
else
  json.extract! @discussion, :code, :body, :headers
end