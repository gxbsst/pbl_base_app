if @school.success?
  json.data do
    json.partial! 'schools/school', school: @school
  end
else
  json.errors @school
end