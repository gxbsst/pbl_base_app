json.data do
  json.partial! 'todo/todos/todo', collection: @todos.data, :as => :todo
end if @todos
json.meta @todos.meta if @todos