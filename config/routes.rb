Rails.application.routes.draw do

  devise_for :users, class_name: 'User'
  get 'custom_login', to: 'application#custom_login'
  
  root :to => 'index#index'

  resources :index, only: %w(index)

  resources :home, only: %w(index)
  resources :projects, defaults: {format: 'json'} do
    member do
      patch 'release'
    end
    resources :assignments, defaults: {format: 'json'}
  end
  resources :standard_decompositions, defaults: {format: 'json'}

  resources :qiniu_tokens, format: :json, only: %w(create)
  resources :qiniu_stat, format: :json, only: %w(index)

  namespace :skill do
    resources :categories, defaults: { format: :json }, only: %w(index)
    resources :sub_categories, defaults: { format: :json }, only: %w(index)
    resources :techniques, defaults: { format: :json }, only: %w(index)
  end
  resources :posts, defaults: { format: :json }

  resources :users, defaults: { format: :json }, only: %w(index create show update destroy)
  resource :register, defaults: { format: :json }, only: %w(create)
  resource :user, defaults: { format: :json }, only: %w(show) do
    resources :friends, defaults: { format: :json }, only: %w(index)
    resources :follows, defaults: { format: :json }, only: %w(index create destroy)
    resources :rules, defaults: { format: :json }, only: %w(index)
    get :groups, :to => 'groups#current_user_index'
    resources :groups, defaults: { format: :json }, only: %w(create destroy)
    get :member_ships, :to => 'member_ships#current_user_index'
    resources :member_ships, defaults: { format: :json }, only: %w(create destroy)
  end

  resources :groups, defaults: { format: :json }, only: %w(index create show update destroy) do
    resources :member_ships, defaults: { format: :json }, only: %w(create destroy)
  end

  namespace :curriculum do
    resources :subjects, defaults: {format: 'json'}, only: %w(index)
    resources :phases, defaults: {format: 'json'}, only: %w(index)
    resources :standards, defaults: {format: 'json'}, only: %w(index)
  end

  resources :gauges, defaults: {format: 'json'}, only: %w(index)
  resource :gauge_recommends, defaults: { format: :json }, only: %w(show)

  resources :product_forms, defaults: {format: 'json'}, only: %w(index)

  namespace :project do
    resources :standard_items, defaults: {format: 'json'}, only: %w(index create destroy)
    resources :techniques, defaults: {format: 'json'}, only: %w(index create destroy)
    resources :products, defaults: {format: 'json'}, only: %w(index create update destroy)
    resources :rules, defaults: {format: 'json'}, only: %w(index create update destroy)
    resources :tasks, defaults: {format: 'json'} do
      member do
        patch 'release'
      end
    end
  end

  resources :member_ships, defaults: { format: :json }

  resources :knowledge, defaults: {format: 'json'}

  resources :roles, defaults: {format: 'json'}

  resources :assignments, defaults: {format: 'json'}

  namespace :assignment do
    resources :works, defaults: {format: 'json'}
    resources :scores, defaults: {format: 'json'}
  end

  resources :disciplines, defaults: {format: 'json'}

  resources :resources, defaults: {format: 'json'}

  resources :regions, defaults: {format: 'json'}

  resources :schools, defaults: {format: 'json'}, only: %w(index create)

  resources :grades, defaults: {format: 'json'}, only: %w(index create)

  resources :clazzs, defaults: {format: 'json'}, only: %w(index create)

  resources :invitations, defaults: {format: 'json'}, only: %w(create show)

  resources :follows, defaults: {format: 'json'}

  resources :groupings, defaults: {format: 'json'}

  resources :discussions, defaults: {format: 'json'}

end
