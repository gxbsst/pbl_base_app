json.data do
  json.partial! 'groups/group', collection: @groups.data, :as => :group
end if @groups
json.meta do
  json.partial! 'share/meta', meta: @groups[:meta]
end if @groups