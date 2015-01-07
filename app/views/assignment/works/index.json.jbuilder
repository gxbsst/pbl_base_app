json.data do
  json.partial! 'assignment/works/work', collection: @works.data, :as => :work
end if @works
json.meta @works.meta if @works