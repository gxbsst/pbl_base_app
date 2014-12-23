json.data do
  json.partial! 'users/user', collection: @users.data, :as => :user
end if @users
json.meta @users.fetch(:meta) if @users