class Api::V1::FavoritesController < Api::ApiApplicationController
  # before_action :set_game, only: [:show, :update, :destroy, :accept_challenge, :decline_challenge, :complete]

  # GET /favorites
  # GET /favorites.json
  def index
    @favorites = Favorite.all
  end





end
