Rails.application.routes.draw do
  get '(*path)', to: 'application#static',
    constraints: ->(request) { request.format.html? or request.format.nil? }

  get 'ping' => 'ping#index'
  get 'weight-calc/:weight' => 'weight_calculator#index'
end
