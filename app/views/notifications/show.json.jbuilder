if @notification.success?
  json.data do
    json.partial! 'notifications/notification', notification: @notification
  end
else
  json.errors @notification
end