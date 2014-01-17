BillApp::Application.routes.draw do
  # users#show currently duplicated, fix that
  resources :users, :except => [:show]
  resource :session, :only => [:new, :create, :destroy]
  namespace :api, :defaults => { :format => :json } do
    resources :users, :only => [:show]
    resources :transactions, :only => [:new, :create, :show]  do
      resources :loans, :only => [:new, :create, :show]
    end
  end
  
  root :to => 'root#root'
end
