json.id project.id
json.name project.name if project.name
json.description project.description if project.description
json.driven_issue project.driven_issue if project.driven_issue
json.start_at project.start_at if project.start_at
json.end_at project.end_at if project.end_at
json.duration project.duration if project.duration
json.duration_unit project.duration_unit if project.duration_unit
json.grade project.grade if project.grade
json.limitation project.limitation if project.limitation
json.public project.public if project.public
json.region_id project.region_id if project.region_id
json.rule_head project.rule_head if project.rule_head
json.rule_template project.rule_template if project.rule_template
json.rules project.rules if project.rules
json.standard_analysis project.standard_analysis if project.standard_analysis
json.standard_decompositions project.standard_decompositions if project.standard_decompositions
json.standard_items project.standard_items if project.standard_items
json.state project.state if project.state
json.tag_list project.tag_list if project.tag_list
json.tasks project.tasks if project.tasks
json.techniques project.techniques if project.techniques
json.recommend project.recommend if project.recommend
json.position project.position if project.position
json.user_id project.user_id if project.user_id
json.knowledges do
  json.partial! 'knowledges/knowledge', collection: project[:knowledges], :as => :knowledge
end if project[:knowledges]