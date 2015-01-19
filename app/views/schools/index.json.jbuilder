json.data do
  json.partial! 'schools/school', collection: @schools.data, :as => :school
end if @schools
json.meta @schools.fetch(:meta) if @schools