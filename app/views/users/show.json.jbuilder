if @user.success?
  json.data do
    json.partial! 'users/user', user: @user
  end
else
  json.extract! @user, :code, :body, :headers
end