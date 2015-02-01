json.id message[:id]
json.user_id message[:user_id] if message[:user_id]
json.sender_id message[:sender_id] if message[:sender_id]
json.post_no message[:post_no] if message[:post_no]
json.hotness message[:hotness] if message[:hotness]
json.created_at message[:created_at] if message[:created_at]
#json.updated_at message[:updated_at] if message[:updated_at]
json.post do
  json.partial! 'posts/post', post: message[:post]
end if message[:post]
json.sender do
  json.partial! 'users/base', user: message[:sender]
end if message[:sender]