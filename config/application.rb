require File.expand_path('../boot', __FILE__)

# Pick the frameworks you want:
require "active_model/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module PblWeb
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    config.pbl_service_client.base_url = ENV['PBL_SERVICE_GATEWAY_URL']

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    config.time_zone = 'Beijing'
    config.active_record.default_timezone = :local

    config.assets.paths << Rails.root.join("app", "assets", "fonts")
    config.assets.precompile += %w( ie.js sso.js admin.js admin.css )

    # config.assets.js_compressor= :yui

    config.angular_templates.htmlcompressor = {
        :remove_intertag_spaces => true
    }

    config.action_dispatch.default_headers = {
        'X-Frame-Options' => 'ALLOWALL'
    }

  end
end
