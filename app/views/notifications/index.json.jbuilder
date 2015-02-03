json.data do
  json.partial! 'notifications/base', collection: @notifications[:data], :as => :notification
end if @notifications
json.meta @notifications.meta if @notifications