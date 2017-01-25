Laris::Router.draw do
  get Regexp.new("^/$"), StaticPagesController, :root

  get Regexp.new("^/scores$"), ScoresController, :index
  post Regexp.new("^/scores$"), ScoresController, :create

  get Regexp.new("^/exception"), ExceptionsController, :i_never_defined_this_method
end
