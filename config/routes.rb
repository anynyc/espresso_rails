Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  namespace 'admin' do
    resources :sessions, only: [:new, :create, :destroy]
    get 'login', to: 'sessions#new', as: :login
    get 'logout', to: 'sessions#destroy', as: :logout
    root 'dashboard#index'
    resources :videos

  end


  namespace :api do
    ##POC routes no sessions
    namespace :v1 do
      resources :videos, only: [:index]
      resources :favorites, only: [:index]
    end
  end

end
