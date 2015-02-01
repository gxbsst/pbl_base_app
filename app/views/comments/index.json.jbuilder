json.data do
  json.partial! 'comments/comment', collection: @comments[:data], :as => :comment
end if @comments
json.meta @comments.meta if @comments