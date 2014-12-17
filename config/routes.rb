Rails.application.routes.draw do
  devise_for :users, class_name: 'Pbl::Models::Users::User'

  root :to => 'index#index'

  resources :index, only: %w(index)

  resources :home, only: %w(index)
  resources :projects, defaults: {format: 'json'}, only: %w(index create destroy show update delete)
  resources :standard_decompositions, defaults: {format: 'json'}

  resources :qiniu_tokens, format: :json, only: %w(create)
  resources :qiniu_stat, format: :json, only: %w(index)

  namespace :skill do
    resources :categories, defaults: { format: :json }, only: %w(index)
    resources :sub_categories, defaults: { format: :json }, only: %w(index)
    resources :techniques, defaults: { format: :json }, only: %w(index)
  end
  #resources :posts, defaults: { format: :json }

  #resources :user, defaults: { format: :json }, only: %w(index)

  namespace :curriculum do
    resources :subjects, defaults: {format: 'json'}, only: %w(index)
    resources :phases, defaults: {format: 'json'}, only: %w(index)
    resources :standards, defaults: {format: 'json'}, only: %w(index)
  end

  resources :gauges, defaults: {format: 'json'}, only: %w(index)
  resources :product_forms, defaults: {format: 'json'}, only: %w(index)

  namespace :project do
    resources :standard_items, defaults: {format: 'json'}, only: %w(index destroy create)
    resources :techniques, defaults: {format: 'json'}, only: %w(index destroy create)
    resources :products, defaults: {format: 'json'}
    resources :rules, defaults: {format: 'json'}, only: %w(index destroy create)
    resources :tasks, defaults: {format: 'json'}
  end

  resources :knowledge, defaults: {format: 'json'}

  resources :roles, defaults: {format: 'json'}

  resources :assignments, defaults: {format: 'json'}

  resources :disciplines, defaults: {format: 'json'}
end
