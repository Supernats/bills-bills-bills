BillApp::Application.routes.draw do
  # users/show currently duplicated: maybe address that
  resources :users
  resource :session, :only => [:new, :create, :destroy]
  namespace :api, :defaults => { :format => :json } do
    resources :users, :only => [:show, :index, :create]
    resources :friends
    resources :transactions
    resources :loans
  end

  root :to => 'root#root'
end
