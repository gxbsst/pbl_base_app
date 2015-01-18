json.id assignment.id
json.user do
  json.partial! 'users/base', user: assignment.user
end if assignment.user