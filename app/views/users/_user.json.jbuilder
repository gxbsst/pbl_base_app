json.id user[:id]
json.username user[:username]
json.avatar user[:avatar] if user[:avatar]
json.type user[:type] if user[:type]
json.email user[:email] if user[:email]
json.title user[:title] if user[:title]
json.age user[:age] if user[:age]
json.gender user[:gender] if user[:gender]
json.first_name user[:first_name] if user[:first_name]
json.last_name user[:last_name] if user[:last_name]
json.realname user[:realname] if user[:realname]
json.nickname user[:nickname] if user[:nickname]
json.bio user[:bio] if user[:bio]
json.school_id user[:school_id] if user[:school_id]
json.school do
  json.partial! 'schools/school', school: user[:school]
end if user[:school]
json.followings_count user[:followings_count] || 0
json.followers_count user[:followers_count] || 0
json.friends_count user[:friends_count] || 0
json.friends do
  json.partial! 'users/base', collection: user[:friends], :as => :user
end if user[:friends]
json.interests user[:interests] if user[:interests]
json.disciplines user[:disciplines] if user[:disciplines]
json.current_step @step[:current_step] if @step