# frozen_string_literal: true

# Handles actions related to movie resources.
# Provides listing of all movies and details for a specific movie.
class MoviesController < ApplicationController
  before_action :set_movie, only: [:show]

  # GET /movies
  # Returns a list of all movies.
  def index
    @movies = Movie.all
    render json: @movies
  end

  # GET /movies/:id
  # Returns the details of a specific movie based on tmdb_id.
  def show
    render json: @movie
  end

  private

  # Sets the movie instance variable based on the tmdb_id from the params.
  def set_movie
    @movie = Movie.find_by(tmdb_id: params[:id])
  end
end
