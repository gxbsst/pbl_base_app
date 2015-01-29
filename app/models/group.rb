class Group < Pbl::Models::Groups::Group

  class << self

    def find_by(options)
      options[:limit] = 1
      rows = self.where(options)
      if rows[:data].size > 0
        self.find(rows[:data].first[:id], options)
      else
        nil
      end
    end

  end

end