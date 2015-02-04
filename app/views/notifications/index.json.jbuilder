json.data do
  json.partial! 'notifications/notification', collection: @notifications[:data], :as => :notification
end if @notifications
json.meta @notifications.meta if @notifications