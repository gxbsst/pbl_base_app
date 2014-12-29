json.id assignment.id
#json.role_id assignment.role_id
json.user do
  json.partial! 'users/user', user: assignment.user
end if assignment.user