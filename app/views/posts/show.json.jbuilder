if @post.success?
  json.data do
    json.partial! 'posts/post', post: @post
  end
else
  json.errors @post
end