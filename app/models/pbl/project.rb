module Pbl
  class Project < Pbl::Models::Projects::Project

    def end_at
      self.start_at + 2.days
    end
  end
end