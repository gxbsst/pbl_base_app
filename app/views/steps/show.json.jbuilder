if @step
  json.partial! 'steps/step', step: @step
else
  json.error 404
end