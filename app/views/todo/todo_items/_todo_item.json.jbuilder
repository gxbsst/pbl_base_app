json.id todo_item[:id]
json.start_at todo_item[:start_at] if todo_item[:start_at]
json.end_at todo_item[:end_at] if todo_item[:end_at]
json.content todo_item[:content] if todo_item[:content]
json.repeat_by todo_item[:repeat_by] if todo_item[:repeat_by]
json.user_id todo_item[:user_id] if todo_item[:user_id]
json.sender_id todo_item[:sender_id] if todo_item[:sender_id]
json.created_at todo_item[:created_at] if todo_item[:created_at]
json.updated_at todo_item[:updated_at] if todo_item[:updated_at]
json.state todo_item[:state] if todo_item[:state]
json.recipients do
  json.partial! 'todo/todos/recipient', collection: todo_item[:recipients], :as => :recipient
end if todo_item[:recipients]
#  recipient: [
#   {
#    assignee_type: 'Clazz', // 指派的类型，是班级还是个人
#    assignee_id: clazz.id  // 指派的id， 班级或者是人的id
#    }
#  ]