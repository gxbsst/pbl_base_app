json.data do
  json.partial! 'resources/resource', collection: @resources.data, :as => :resource
end if @resources
json.meta @resources.fetch(:meta) if @resources