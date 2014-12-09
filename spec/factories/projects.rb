FactoryGirl.define do
  factory :project, class: Pbl::Models::Projects::Project do
    sequence(:name) {|n| "project-name-#{n}"}
    driven_issue "driven_issue"
    standard_analysis "standard_analysis"
    duration 1
    description 'description'
    state 'draft'
  end
end