json.data do
  json.partial! 'project/tasks/task', collection: @tasks.data, :as => :task
end if @tasks
json.meta @tasks.meta if @tasks