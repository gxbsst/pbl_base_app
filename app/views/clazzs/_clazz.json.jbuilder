json.id clazz[:id]
json.name clazz[:name] if clazz[:name] 
json.school_id clazz[:school_id] if clazz[:school_id] 
json.grade_id clazz[:grade_id] if clazz[:grade_id] 
json.user_id clazz[:user_id] if clazz[:user_id] 
json.master_id clazz[:master_id] if clazz[:master_id] 
json.students do
  json.partial! 'students/student', collection: clazz[:students], :as => :student
end if clazz[:students] && params[:include] && params[:include].split(',').include?('students')