if @score.success?
  json.data do
    json.partial! 'assignment/works/work', score: @score
  end
else
  json.extract! @score, :code, :body, :headers
end