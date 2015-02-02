# encoding: utf-8

class NotificationDeliveryWorker
  include Sidekiq::Worker
  sidekiq_options :queue => :default

  def perform(options)

    begin
      Notification.create(options)
    rescue => e
      Sidekiq.logger.fatal(e)
    end

  end

end
