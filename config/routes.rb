BillApp::Application.routes.draw do
  # users#show currently duplicated, fix that
  resources :users
  resource :session, :only => [:new, :create, :destroy]
  namespace :api, :defaults => { :format => :json } do
    resources :transactions, :only => [:new, :create, :show]
    resources :debts, :only => [:index]
    resources :credits, :only => [:index]
  end
  
  root :to => 'root#root'
end
