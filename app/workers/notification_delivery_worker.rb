# encoding: utf-8
class NotificationDeliveryWorker
  include Sidekiq::Worker
  sidekiq_options :queue => :default

  def perform(id)
    puts '1............'
    puts id
    puts '2............'
    post = Post.find(id)
    if post.success?
      puts '3............'
      puts post.to_hash
      notification = Notification.create({
                                             subject: '您的动态有新的评论',
                                             content: '您的动态有新的评论，请及时查看',
                                             sender_type: :System,
                                             user_id: post[:sender_id],
                                             #additional_info: post[:id],
                                             type: :Comment
                                         })
      puts notification.to_hash
      puts '4............'
    end
  end

end
