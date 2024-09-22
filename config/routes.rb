Rails.application.routes.draw do
  get 'data/index'
  resources :appointments
  resources :doctor
  resources :data
  devise_for :users

  devise_scope :user do
    authenticated :user do
      root 'user#index', as: :authenticated_root
    end

    unauthenticated do
      root 'devise/sessions#new', as: :unauthenticated_root
    end
  end
end
