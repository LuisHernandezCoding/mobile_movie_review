# frozen_string_literal: true

FactoryBot.define do
  factory :movie do
    title { Faker::Movie.title }
    tmdb_id { Faker::Number.unique.number(digits: 7) }
    description { Faker::Lorem.paragraph }
    adult { Faker::Boolean.boolean }
    backdrop_path { Faker::LoremFlickr.image(size: '640x480', search_terms: ['movie']) }
    genre_ids { Faker::Lorem.words(number: 4) }
    original_language { Faker::Address.country_code.downcase }
    original_title { title }
    popularity { Faker::Number.decimal(l_digits: 2) }
    poster_path { Faker::LoremFlickr.image(size: '500x750', search_terms: ['movie']) }
    release_date { Faker::Date.backward(days: 365 * 5) }
    vote_average { Faker::Number.between(from: 1, to: 10) }
    vote_count { Faker::Number.number(digits: 3) }
  end
end
