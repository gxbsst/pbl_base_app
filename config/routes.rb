Rails.application.routes.draw do
  devise_for :users, class_name: 'Pbl::Models::Users::User'

  root :to => 'index#index'

  resources :index, only: %w(index)

  resources :home, only: %w(index)
  resources :projects, defaults: {format: 'json'}

  #resources :posts, defaults: { format: :json }

  #resources :user, defaults: { format: :json }, only: %w(index)

end
