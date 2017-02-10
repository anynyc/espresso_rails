Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  namespace 'admin' do
    resources :sessions, only: [:new, :create, :destroy]
    get 'login', to: 'sessions#new', as: :login
    get 'logout', to: 'sessions#destroy', as: :logout
    root 'dashboard#index'
    resources :videos

  end


end
