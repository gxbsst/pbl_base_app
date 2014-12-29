json.data do
  json.partial! 'member_ships/member_ship', collection: @member_ships.data, :as => :member_ship
end if @member_ships
json.meta @member_ships.meta if @member_ships