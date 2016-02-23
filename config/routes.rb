dir_name = File.expand_path(File.dirname(__FILE__))
Dir["#{dir_name}/../app/controllers/*_controller.rb"].each {|file| require file }
require_relative 'lib/router'

ROUTER = Router.new

ROUTER.draw do
  get Regexp.new("^/$"), StaticPagesController, :root

  get Regexp.new("^/scores$"), ScoresController, :index
  post Regexp.new("^/scores$"), ScoresController, :create

  get Regexp.new("^/exception"), ExceptionsController, :i_never_defined_this_method
end
