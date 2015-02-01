if @comment.success?
  json.data do
    json.partial! 'comments/comment', comment: @comment
  end
else
  json.errors @comment
end