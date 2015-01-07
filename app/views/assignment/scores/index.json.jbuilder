json.data do
  json.partial! 'assignment/scores/score', collection: @scores.data, :as => :score
end if @scores
json.meta @scores.meta if @scores