json.data do
  json.partial! 'projects/base', collection: @projects.data, :as => :project
end if @projects
json.meta @projects.meta if @projects