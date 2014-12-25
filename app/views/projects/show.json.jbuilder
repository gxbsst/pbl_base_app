if @project.success?
  json.data do
    json.extract! @project, :id, :name, :driven_issue, :standard_analysis, :duration, :description, :limitation, :region_id, :grade, :standard_decompositions, :user_id, :rule_head, :rule_template, :tag_list, :duration_unit, :techniques, :standard_items, :rules, :standard_decompositions, :public, :knowledge, :tasks, :state
  end
else
  json.extract! @project, :code, :body, :headers
end