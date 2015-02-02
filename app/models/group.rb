class Group < Pbl::Models::Groups::Group

  class << self

    def find_by(options)
      options[:limit] = 1
      entries = self.where(options)
      return nil if entries[:data].empty?
      self.find(entries[:data].first[:id], options)
    end

    def destroy_by(options)
      entries = self.where(options)
      entries[:data].each do |entry|
        self.destroy(entry[:id])
      end if entries[:data]
    end

  end

end