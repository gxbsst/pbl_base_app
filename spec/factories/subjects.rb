FactoryGirl.define do
  factory :subject, class: Pbl::Models::Curriculum::Subject do
    sequence(:name) {|n| "subject-name-#{n}"}
    sequence(:position)
  end
end