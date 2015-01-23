if @student.success?
  json.data do
    json.partial! 'students/student', student: @student
  end
else
  json.errors @student
end