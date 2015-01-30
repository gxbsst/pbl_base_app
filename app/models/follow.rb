class Follow < Pbl::Models::Follow

  class << self

    def destroy_by(options)
      entries = self.where(options)
      entries[:data].each do |entry|
        self.destroy(entry[:id])
      end if entries[:data]
    end

  end

end