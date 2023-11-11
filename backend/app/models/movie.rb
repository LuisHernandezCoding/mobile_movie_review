class Movie < ApplicationRecord
  serialize :genre_ids, Array

  has_many :reviews
end
