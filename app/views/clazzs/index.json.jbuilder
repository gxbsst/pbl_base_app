json.data do
  json.partial! 'clazzs/clazz', collection: @clazzs.data, :as => :clazz
end if @clazzs
json.meta @clazzs.fetch(:meta) if @clazzs