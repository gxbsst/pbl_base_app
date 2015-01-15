source 'http://ruby.taobao.org'
source 'https://rails-assets.org'


gem 'rails', '4.1.7'

group :development, :test do
  gem 'sqlite3', platform: [:ruby]
end

gem 'activerecord-jdbcpostgresql-adapter', platforms: [:jruby]

gem 'sass-rails'
gem 'compass-rails', '~> 2.0.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.0.0'

gem 'jquery-rails', '3.1.2'

#gem 'turbolinks'

gem 'jbuilder', '~> 2.0'
gem 'tzinfo-data'

gem 'spring', group: :development

gem 'devise'

gem 'devise_cas_authenticatable'

gem 'activerecord-session_store', github: 'rails/activerecord-session_store'

gem 'figaro'

gem 'qiniu', '~> 6.3.1'

gem 'pbl_service_client', git: 'git@58.246.127.90:pbl/pbl_service_client.git', branch: 'master'

gem 'rails-assets-jquery', '~> 1.10.0'

gem 'rails-assets-mockjs', '~> 0.1.5'

gem 'rails-assets-css3-mediaqueries-js'
gem 'rails-assets-es5-shim'

gem 'rails-assets-angular', '~> 1.2.0'
gem 'rails-assets-angular-route', '~> 1.2.0'
gem 'rails-assets-angular-sanitize', '~> 1.2.0'
gem 'rails-assets-angular-resource', '~> 1.2.0'
gem 'rails-assets-angular-cache', '~> 2.3.7'
gem 'rails-assets-angular-ui-router', '~> 0.2.12'
gem 'rails-assets-angular-validation', '~> 1.2.0'
gem 'rails-assets-restangular'
gem 'rails-assets-lodash'
gem 'rails-assets-interact'
gem 'rails-assets-angular-chart.js'
gem 'rails-assets-angular-moment'
gem 'rails-assets-angular-bootstrap-datetimepicker'
gem 'rails-assets-moment-timezone'

gem 'htmlcompressor'
gem 'angular-rails-templates'

group :development do
  gem 'thin', platform: :ruby
  gem 'capistrano'
  gem 'capistrano-rails'
  gem 'capistrano3-puma'
  gem 'capistrano-rvm'
  gem 'capistrano-bundler'
  gem 'capistrano-sidekiq'
end

gem 'puma', platforms: :jruby

group :test do
  gem 'json_spec'
end

group :development, :test do
  gem 'rspec-rails'
  gem 'factory_girl_rails'
end