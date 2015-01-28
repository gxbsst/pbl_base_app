json.id group[:id]
json.name group[:name] if group[:name]
json.no group[:no] if group[:no]
json.owner_id group[:owner_id] if group[:owner_id]
json.owner_type group[:owner_type] if group[:owner_type]
json.description group[:description] if group[:description]
json.code group[:invitation_code] if group[:invitation_code]
json.members_count group[:members_count] if group[:members_count]
json.members do
  json.partial! 'member_ships/member_ship', collection: group[:member_ships], :as => :member_ship
end if group[:member_ships]
json.clazz do
  json.partial! 'clazzs/clazz', clazz: group[:clazz]
end if group[:clazz]