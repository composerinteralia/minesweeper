require 'laris'
Laris.root = File.expand_path(File.dirname(__FILE__))

require_relative 'config/routes'

run Laris.app
