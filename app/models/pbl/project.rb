module Pbl
  class Project < Pbl::Models::Projects::Project

    def end_at
      if self.start_at && self.duration_unit && self.duration
        return Time.parse(self.start_at) + case self.duration_unit
                                             when '1' then
                                               self.duration.hours
                                             when '2' then
                                               self.duration.days
                                             when '3' then
                                               self.duration.weeks
                                           end
      else
        nil
      end
    end
  end
end