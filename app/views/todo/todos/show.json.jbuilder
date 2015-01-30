if @todo.success?
  json.data do
    json.partial! 'todo/todos/todo', todo: @todo
  end
else
  json.extract! @todo, :code, :body, :headers
end