if @clazz.success?
  json.data do
    json.partial! 'clazzs/clazz', clazz: @clazz
  end
else
  json.errors @clazz
end