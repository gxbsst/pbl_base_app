json.id gauge[:id]
json.level_1 gauge[:level_1] if gauge[:level_1]
json.level_2 gauge[:level_2] if gauge[:level_2]
json.level_3 gauge[:level_3] if gauge[:level_3]
json.level_4 gauge[:level_4] if gauge[:level_4]
json.level_5 gauge[:level_5] if gauge[:level_5]
json.level_6 gauge[:level_6] if gauge[:level_6]
json.level_7 gauge[:level_7] if gauge[:level_7]
json.reference_count gauge[:reference_count] if gauge[:reference_count]
json.standard gauge[:standard] if gauge[:standard]
json.weight gauge[:weight] if gauge[:weight]
if gauge[:technique]
  json.technique do
    json.partial! 'techniques/technique', technique: gauge[:technique]
  end
else
  json.technique_id gauge[:technique_id] if gauge[:technique_id]
end