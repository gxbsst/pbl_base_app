json.data do
  json.partial! 'discussions/discussion', collection: @discussions.data, :as => :discussion
end if @discussions
json.meta @discussions.meta if @discussions