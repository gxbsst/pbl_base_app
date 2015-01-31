json.id todo[:id]
json.start_at todo[:start_at] if todo[:start_at]
json.end_at todo[:end_at] if todo[:end_at]
json.content todo[:content] if todo[:content]
json.repeat_by todo[:repeat_by] if todo[:repeat_by]
json.state todo[:state] if todo[:state]
json.user_id todo[:user_id] if todo[:user_id]
json.recipients do
  json.partial! 'todo/todos/recipient', collection: todo[:recipients], :as => :recipient
end if todo[:recipients]
