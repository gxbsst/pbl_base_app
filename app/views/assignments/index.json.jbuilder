json.data do
  json.partial! 'assignments/assignment', collection: @assignments.data, :as => :assignment
end
json.meta @assignments.meta if @assignments