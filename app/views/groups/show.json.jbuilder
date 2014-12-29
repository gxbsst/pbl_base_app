if @group.success?
  json.data do
    json.partial! 'groups/group', group: @group
  end
else
  json.extract! @group, :code, :body, :headers
end