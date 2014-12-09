# encoding: utf-8

class QiniuTokensController < ApplicationController
  def create
    options = {
        scope: params[:bucket] || settings[:images_bucket],
        expires_in: 3600,
        return_body: return_body
    }

    if params[:key]
      options[:scope] = "#{options[:scope]}:#{params[:key]}"
    end

    options = options.merge!(set_video_option) if params[:bucket] == settings[:videos_bucket]

    render json: { token: Qiniu.generate_upload_token(options) }
  end

  private

  def settings
    @settings ||= Qiniu::Config.settings
  end

  def return_body
    '{
          "name": $(fname),
          "size": $(fsize),
          "ext": $(ext),
          "mimeType": $(mimeType),
          "key": $(key),
          "hash": $(etag),
          "exif": $(exif),
          "imageInfo": $(imageInfo),
          "imageAve": $(imageAve)
        }'
  end

  def return_body_video
    '{
          "name": $(fname),
          "size": $(fsize),
          "ext": $(ext),
          "mimeType": $(mimeType),
          "key": $(key),
          "hash": $(etag),
          "persistentId":$(persistentId),
          "avinfo":$(avinfo)
        }'
  end

  def set_video_option(options = {})
    {
        return_body: return_body_video,
        persistentOps: settings[:mp4],
        persistentNotifyUrl: Settings.qiniu.notifyURL,
        persistentPipeline: settings[:pipeline]
    }.merge!(options)
  end

end
