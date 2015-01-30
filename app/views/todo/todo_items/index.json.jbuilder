json.data do
  json.partial! 'todo/todo_items/todo_item', collection: @todo_items.data, :as => :todo_item
end if @todo_items
json.meta @todo_items.meta if @todo_items