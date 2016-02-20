Rails.application.routes.draw do
  get 'ping' => 'ping#index'

  get 'weight-calc/:weight' => 'weight_calculator#index'
end
