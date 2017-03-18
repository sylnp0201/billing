Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    mount_devise_token_auth_for 'User', at: '/auth'

    resources :cases do
      get 'search', to: 'cases#index'
    end

    resources :reasons
    resources :bills

    get 'last_bill', to: 'bills#last'
    post 'downloads', to: 'downloads#create'
  end

  get 'downloads/:user_id/:token/:filename', to: 'downloads#index'
  get '/.well-known/acme-challenge/:id' => 'home#letsencrypt'

  root 'home#index'

  get '*path', to: 'home#index'
end
