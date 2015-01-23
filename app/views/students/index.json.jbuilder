json.data do
  json.partial! 'students/student', collection: @students.data, :as => :student
end if @students
json.meta @students.meta if @students