require_relative 'lib/controller_base'
require_relative '../models/score'
require 'byebug'

class ScoresController < ControllerBase
  def create
    # strong params would be nice
    score = Score.new(params["score"])

    # save should return true or false
    score.save
    render_content(JSON.generate(score.attributes), "application/json")
  end

  def index
    scores = Score.all.order("score").limit(10).to_a.map(&:attributes)
    render_content(JSON.generate(scores), "application/json")
  end
end
