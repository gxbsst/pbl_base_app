json.id member_ship[:id]
#json.group_id member_ship[:group_id]
json.user_id member_ship[:user_id]
json.role member_ship[:role]
json.group do
  json.partial! 'groups/group', group: member_ship[:group]
end if member_ship[:group]
json.user do
  json.partial! 'users/base', user: member_ship[:member]
end if member_ship[:member]