if @friend_ship.success?
  json.data do
    json.partial! 'friend_ships/friend_ship', friend_ship: @friend_ship
  end
else
  json.extract! @friend_ship, :code, :body, :headers
end