# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Movies', type: :request do
  let!(:movie) { create(:movie) }
  let!(:review) { create(:review, movie: movie) }

  describe 'GET /movies' do
    it 'returns all movies' do
      get movies_path
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body).size).to eq(1)
    end
  end

  describe 'GET /movies/:id' do
    it 'returns a movie by tmdb_id' do
      get movie_path(movie.tmdb_id)
      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body)['tmdb_id']).to eq(movie.tmdb_id)
    end
  end
end
