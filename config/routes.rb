BillApp::Application.routes.draw do
  # users/show currently duplicated: maybe address that
  resources :users
  resource :session, :only => [:new, :create, :destroy]
  namespace :api, :defaults => { :format => :json } do
    resources :users, :only => [:show] do
      resources :friends
    end
    resources :transactions do
      resources :loans
    end
  end

  root :to => 'root#root'
end
