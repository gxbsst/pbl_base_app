Rails.application.routes.draw do

  devise_for :users, class_name: 'Pbl::Models::Users::User'
  get 'custom_login', to: 'user#custom_login'
  
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

  resources :users, defaults: { format: :json }, only: %w(index create show update destroy) do
    get :clazzs, :to => 'clazzs#user_clazzs'
    resources :clazzs, defaults: { format: :json }, only: %w(index)
  end
  resource :register, defaults: { format: :json }, only: %w(create)
  resource :user, defaults: { format: :json }, only: %w(show) do
    resources :friends, defaults: { format: :json }, only: %w(index)
    resources :follows, defaults: { format: :json }, only: %w(index create destroy)
    resources :rules, defaults: { format: :json }, only: %w(index)
    get :children, :to => 'friend_ships#get_user_children'
    post :children, :to => 'friend_ships#add_user_child'
    get :invitations, :to => 'invitations#current_user_index'
    resources :invitations, defaults: {format: 'json'}, only: %w(create show)
    get :groups, :to => 'groups#user_index'
    resources :groups, defaults: { format: :json }, only: %w(create destroy)
    get :clazzs, :to => 'clazzs#user_clazzs'
    resources :clazzs, defaults: { format: :json }, only: %w(index)
    resources :steps, defaults: { format: :json }, only: %w(index create show update)
    get :member_ships, :to => 'member_ships#current_user_index'
    resources :member_ships, defaults: { format: :json }, only: %w(create destroy)
  end

  resources :groups, defaults: { format: :json }, only: %w(index create show update destroy) do
    resources :member_ships, defaults: { format: :json }, only: %w(create destroy)
    collection do
      get ':ids', to: 'groups#index', constraints: {ids: /.+[,].+/}
    end
  end

  namespace :curriculum do
    resources :subjects, defaults: {format: 'json'}, only: %w(index)
    resources :phases, defaults: {format: 'json'}, only: %w(index)
    resources :standards, defaults: {format: 'json'}, only: %w(index)
  end

  resources :gauges, defaults: {format: 'json'}, only: %w(index show)
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

  resources :friend_ships, defaults: { format: :json }

  resources :students, defaults: { format: :json }

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

  resources :schools, defaults: {format: 'json'}, only: %w(index create show)

  resources :grades, defaults: {format: 'json'}, only: %w(index create)

  resources :clazzs, defaults: {format: 'json'}, only: %w(index create) do
    collection do
      get ':ids', to: 'clazzs#index', constraints: {ids: /.+[,].+/}
    end
  end

  resources :follows, defaults: {format: 'json'}

  resources :groupings, defaults: {format: 'json'}

  resources :discussions, defaults: {format: 'json'}

  resources :sso_callback, only: %w(index)

  namespace :admin do
    root :to => 'index#index'
    resources :standard_items
    resources :subjects
    resources :phases
    resources :standards
    resources :techniques
    resources :categories
    resources :sub_categories
    resources :gauges
  end

end
