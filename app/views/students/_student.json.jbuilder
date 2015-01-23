json.id student[:id]
if student[:user]
  json.user do
    json.partial! 'users/base', user: student[:user]
  end
else
  json.user_id student[:user_id] if student[:user_id]
end
json.clazz_id student[:clazz_id] if student[:clazz_id]
json.role student[:role] if student[:role]
json.clazz do
  json.partial! 'clazzs/clazz', clazz: student[:clazz]
end if student[:clazz]