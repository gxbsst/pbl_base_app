if @task.success?
  json.data do
    json.partial! 'project/tasks/task', task: @task
  end
else
  json.extract! @task, :code, :body, :headers
end