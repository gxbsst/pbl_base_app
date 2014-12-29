json.id group[:id]
json.name group[:name]
json.creator group[:user_id]
json.description group[:description] if group[:description]
json.members_count group[:members_count] if group[:members_count]
json.members do
  json.partial! 'member_ships/member_ship', collection: group[:member_ships], :as => :member_ship
end if group[:member_ships]