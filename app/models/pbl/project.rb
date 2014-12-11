module Pbl
  class Project < Pbl::Models::Projects::Project
    attribute :project_name, String

    def project_name=(value)
      @name = value
      @project_name = value
    end
  end
end