class Hash
  def pass(keys)
    tmp = self.clone
    tmp.delete_if { |k, v| !keys.include?(k) }
    tmp
  end

  def block(keys)
    tmp = self.clone
    tmp.delete_if { |k, v| keys.include?(k) }
    tmp
  end
end