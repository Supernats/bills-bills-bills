BillApp::Application.routes.draw do
  # users#show currently duplicated, fix that
  resources :users
  resource :session, :only => [:new, :create, :destroy]
  namespace :api, :defaults => { :format => :json } do
    resources :users, :only => [:show]
    resources :transactions do
      resources :loans
    end
  end
  
  root :to => 'root#root'
end
