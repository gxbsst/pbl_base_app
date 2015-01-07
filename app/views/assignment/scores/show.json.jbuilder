if @score.success?
  json.data do
    json.partial! 'assignment/scores/score', score: @score
  end
else
  json.extract! @score, :code, :body, :headers
end