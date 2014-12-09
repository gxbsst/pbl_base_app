Qiniu.establish_connection! :access_key             => 'bRbi-N3bkttMLQBDOj9RAQAxZNP0BVbwuZbRC1I8',
                            :secret_key             => 'V1g-AdwMZ9RImWP03GbrWm9H6dGmNM5pLZEEdmLS',
                            :api_host               => 'http://api.qiniu.com',
                            :attachments_bucket     => 'mooc-attachments',
                            :images_bucket          => 'mooc-images',
                            :videos_bucket          => 'mooc-video',
                            :output_bucket          => 'mooc-video-$(mime)',
                            :mp4_params             => 'avthumb/mp4/ab/160k/ar/44100/acodec/libfaac/r/30/vb/2200k/vcodec/libx264/s/1280x720/autoscale/1/stripmeta/0|saveas/',
                            :ogv_params             => 'avthumb/ogv/ab/160k/ar/44100/acodec/libvorbis/r/30/vb/2200k/vcodec/libtheora/s/1280x720/autoscale/1/stripmeta/0|saveas/',
                            :vframe                 => 'vframe/jpg/offset/$(offset)/w/$(width)/h/$(height)|saveas/'



