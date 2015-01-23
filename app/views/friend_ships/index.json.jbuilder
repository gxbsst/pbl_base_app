json.data do
  json.partial! 'friend_ships/friend_ship', collection: @friend_ships.data, :as => :friend_ship
end if @friend_ships
json.meta @friend_ships.meta if @friend_ships