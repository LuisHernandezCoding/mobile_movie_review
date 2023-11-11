# frozen_string_literal: true

namespace :db do
  desc 'Seed the database with movies from The Movie Database API'
  task initial_movies_seed: :environment do
    MovieSeeder.seed_movies_from_tmdb
    puts 'Rake for Seeding the database has finished...'
  end
end

# Class responsible for seeding the database with movies.
# This class fetches data from The Movie Database API
# and populates the movies table with this data.
class MovieSeeder
  def self.seed_movies_from_tmdb
    movies = fetch_movies_from_tmdb
    movies.each { |movie_data| create_movie_record(movie_data) }
  end

  def self.fetch_movies_from_tmdb
    api_key = ENV['TMDB_API_KEY']
    url = "https://api.themoviedb.org/3/discover/movie?api_key=#{api_key}"

    response = HTTParty.get(url)

    if response.success?
      response.parsed_response['results']
    else
      handle_http_errors(response)
    end
  end

  def self.handle_errors(response)
    case response
    when Net::HTTPUnauthorized
      puts 'Error: API Key Invalid.'
    when Net::HTTPTooManyRequests
      puts 'Error: API Limit reached.'
    else
      puts "Unknown error: #{response.message}"
    end
    []
  end

  def self.create_movie_record(movie_data)
    Movie.create!(movie_attributes(movie_data))
  rescue ActiveRecord::RecordInvalid => e
    puts "Failed to create movie record: #{e.record.errors.full_messages.join(', ')}"
  rescue StandardError => e
    puts "Error saving movie: #{e.message}"
  end

  # rubocop:disable Metrics/MethodLength
  def self.movie_attributes(movie_data)
    {
      title: movie_data['title'],
      description: movie_data['overview'],
      tmdb_id: movie_data['id'],
      adult: movie_data['adult'],
      backdrop_path: movie_data['backdrop_path'],
      genre_ids: movie_data['genre_ids'],
      original_language: movie_data['original_language'],
      original_title: movie_data['original_title'],
      popularity: movie_data['popularity'],
      poster_path: movie_data['poster_path'],
      release_date: movie_data['release_date'],
      vote_average: movie_data['vote_average'],
      vote_count: movie_data['vote_count']
    }
  end
  # rubocop:enable Metrics/MethodLength
end
