json.data do
  json.partial! 'posts/post', collection: @posts, :as => :post
end