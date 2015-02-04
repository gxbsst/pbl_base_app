json.data do
  json.partial! 'knowledges/knowledge', collection: @knowledges.data, :as => :knowledge
end if @knowledges
json.meta @knowledges.fetch(:meta) if @knowledges