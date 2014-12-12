Rails.application.routes.draw do
  devise_for :users, class_name: 'Pbl::Models::Users::User'

  root :to => 'index#index'

  resources :index, only: %w(index)

  resources :home, only: %w(index)
  resources :projects, defaults: {format: 'json'}

  resources :qiniu_tokens, format: :json, only: %w(create)
  resources :qiniu_stat, format: :json, only: %w(index)

  #resources :posts, defaults: { format: :json }

  #resources :user, defaults: { format: :json }, only: %w(index)

  scope module: 'curriculum' do
    resources :subjects, defaults: {format: 'json'}
    resources :phases, defaults: {format: 'json'}
    resources :standards, defaults: {format: 'json'}
  end
end
