if @message.success?
  json.data do
    json.partial! 'messages/message', message: @message
  end
else
  json.errors @message
end