json.data do
  json.partial! 'posts/post', collection: @posts[:data], :as => :post
end if @posts
json.meta @posts.meta if @posts