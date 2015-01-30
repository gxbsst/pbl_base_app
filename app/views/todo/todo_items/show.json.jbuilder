if @todo_item.success?
  json.data do
    json.partial! 'todo/todo_items/todo_item', todo_item: @todo_item
  end
else
  json.extract! @todo_item, :code, :body, :headers
end