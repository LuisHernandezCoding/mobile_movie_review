# frozen_string_literal: true

# Controller to manage actions related to review resources.
# This controller allows listing reviews associated with a movie and creating new reviews.
class ReviewsController < ApplicationController
  before_action :set_movie

  # GET /movies/:movie_id/reviews
  # Returns a list of reviews for a specific movie identified by tmdb_id.
  def index
    @reviews = @movie.reviews
    render json: @reviews
  end

  # POST /movies/:movie_id/reviews
  # Allows the creation of a review for a movie identified by tmdb_id.
  def create
    @review = @movie.reviews.build(review_params)
    if @review.save
      render json: @review, status: :created
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  private

  # Sets the movie based on the tmdb_id provided in the route parameters.
  def set_movie
    @movie = Movie.find_by(tmdb_id: params[:movie_id])
    render json: { error: 'Movie not found' }, status: :not_found if @movie.nil?
  end

  # Filters the permitted parameters for a review.
  def review_params
    params.require(:review).permit(:content, :rating)
  end
end
