if @follow.success?
  json.data do
    json.extract! @follow, :id, :user_id, :follower_id
  end
else
  json.extract! @follow, :code, :body, :headers
end