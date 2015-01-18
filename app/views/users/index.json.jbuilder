json.data do
  json.partial! 'users/base', collection: @users.data, :as => :user
end if @users
json.meta @users.fetch(:meta) if @users