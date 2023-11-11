# frozen_string_literal: true

FactoryBot.define do
  factory :review do
    content { Faker::Lorem.paragraph }
    rating { Faker::Number.between(from: 1, to: 5) }
    movie
  end
end
