json.id notification[:id]
json.subject notification[:subject] if notification[:subject]
json.read notification[:read] if notification[:read]
json.sender_type notification[:sender_type] if notification[:sender_type]
json.event_type notification[:event_type] if notification[:event_type]
json.created_at notification[:created_at] if notification[:created_at]
json.additional_info do
  json.partial! 'notifications/additional_info', additional_info: notification[:additional_info]
end if notification[:additional_info]