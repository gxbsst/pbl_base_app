json.id notification[:id]
json.subject notification[:subject] if notification[:subject]
json.content notification[:content] if notification[:content]
json.read notification[:read] if notification[:read]
json.state notification[:state] if notification[:state]
json.global notification[:global] if notification[:global]
json.sender_type notification[:sender_type] if notification[:sender_type]
json.sender_id notification[:sender_id] if notification[:sender_id]
json.type notification[:type] if notification[:type]
json.event_type notification[:event_type] if notification[:event_type]
json.additional_info notification[:additional_info] if notification[:additional_info]
json.created_at notification[:created_at] if notification[:created_at]
json.clazz do
  json.partial! 'clazzs/clazz', clazz: notification[:clazz]
end if notification[:clazz]
json.group do
  json.partial! 'groups/base', group: notification[:group]
end if notification[:group]
json.user do
  json.partial! 'users/base', user: notification[:user]
end if notification[:user]
json.post do
  json.partial! 'posts/post', post: notification[:post]
end if notification[:post]