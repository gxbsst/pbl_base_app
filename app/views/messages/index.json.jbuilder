json.data do
  json.partial! 'messages/message', collection: @messages[:data], :as => :message
end if @messages
json.meta @messages.meta if @messages