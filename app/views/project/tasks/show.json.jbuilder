json.data do
  json.extract! @task, :id, :project_id, :title, :description, :teacher_tools, :student_tools, :task_type, :discipline_id, :evaluation_duration, :evaluation_cycle, :product_id, :event_duration, :event_cycle
end