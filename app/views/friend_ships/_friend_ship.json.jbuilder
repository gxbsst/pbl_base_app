json.id friend_ship[:id]
json.user_id friend_ship[:user_id] if friend_ship[:user_id]
json.user do
  json.partial! 'users/base', user: friend_ship[:user]
end if friend_ship[:user]
json.friend_id friend_ship[:friend_id] if friend_ship[:friend_id]
json.friend do
  json.partial! 'users/base', user: friend_ship[:friend]
end if friend_ship[:friend]
json.relation friend_ship[:relation] if friend_ship[:relation]