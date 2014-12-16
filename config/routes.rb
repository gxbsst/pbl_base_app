Rails.application.routes.draw do
  devise_for :users, class_name: 'Pbl::Models::Users::User'

  root :to => 'index#index'

  resources :index, only: %w(index)

  resources :home, only: %w(index)
  resources :projects, defaults: {format: 'json'}
  resources :products, defaults: {format: 'json'}
  resources :standard_decompositions, defaults: {format: 'json'}

  resources :qiniu_tokens, format: :json, only: %w(create)
  resources :qiniu_stat, format: :json, only: %w(index)

  namespace :skill do
    resources :categories, defaults: { format: :json }
    resources :sub_categories, defaults: { format: :json }
    resources :techniques, defaults: { format: :json }
  end
  #resources :posts, defaults: { format: :json }

  #resources :user, defaults: { format: :json }, only: %w(index)

  namespace :curriculum do
    resources :subjects, defaults: {format: 'json'}
    resources :phases, defaults: {format: 'json'}
    resources :standards, defaults: {format: 'json'}
  end

  resources :gauges, defaults: {format: 'json'}

  resources :standard_items, defaults: {format: 'json'}
  resources :techniques, defaults: {format: 'json'}

  resources :knowledges, defaults: {format: 'json'}
end
