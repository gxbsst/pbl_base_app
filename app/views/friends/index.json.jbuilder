json.data do
  json.partial! 'users/base', collection: @user[:friends], :as => :user
end if @user