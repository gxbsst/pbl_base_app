class User < Pbl::Models::Users::User

  def self.find_by(options)
    rows = self.where(options)
    rows[:data].each do |row|
      return row
    end
    return nil
  end

end
