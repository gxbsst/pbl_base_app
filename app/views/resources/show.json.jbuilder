if @resource.success?
  json.data do
    json.partial! 'resources/resource', resource: @resource
  end
else
  json.extract! @resource, :code, :body, :headers
end