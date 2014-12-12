Project = Pbl::Models::Projects::Project.class_eval do
  attribute :project_name

  def project_name=(value)
    self.name = value
    @project_name = value
  end
end
