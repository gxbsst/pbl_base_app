json.user_id additional_info[:user_id] if additional_info[:user_id]
json.user do
  json.partial! 'users/base', user: additional_info[:user]
end if additional_info[:user]