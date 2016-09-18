Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    mount_devise_token_auth_for 'User', at: '/auth'
    resources :cases
    resources :bills
  end

  root 'home#index'

  get '*path', to: 'home#index'
end
