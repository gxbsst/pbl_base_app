if @knowledge.success?
  json.data do
    json.partial! 'knowledges/knowledge', knowledge: @knowledge
  end
else
  json.extract! @knowledge, :code, :body, :headers
end