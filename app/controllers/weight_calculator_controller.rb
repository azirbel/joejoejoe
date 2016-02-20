class WeightCalculatorController < ActionController::Base
  def index
    weight = params[:weight].to_f

    weight_set = [45, 25, 10, 5, 2.5, 1.25]
    side_weight = (weight - 45) / 2.0

    result = []
    while side_weight > 0
      next_weight = weight_set.select { |w| w <= side_weight }.max
      raise "Could not solve for weight #{weight}" unless next_weight
      result<<next_weight
      side_weight -= next_weight
    end

    render json: result
  end
end
