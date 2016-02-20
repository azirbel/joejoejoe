class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def static
    render file: 'public/index.html'
  end
end
