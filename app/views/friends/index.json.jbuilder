json.data do
  json.partial! 'users/user', collection: @user[:friends], :as => :user
end if @user