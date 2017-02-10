class Api::V1::VideosController < Api::ApiApplicationController
  # before_action :set_game, only: [:show, :update, :destroy, :accept_challenge, :decline_challenge, :complete]

  # GET /videos
  # GET /videos.json
  def index
    @videos = Video.all
  end





end
