class AddDetailsToMovies < ActiveRecord::Migration[6.0]
  def change
    add_column :movies, :adult, :boolean
    add_column :movies, :backdrop_path, :string
    add_column :movies, :genre_ids, :text
    add_column :movies, :original_language, :string
    add_column :movies, :original_title, :string
    add_column :movies, :popularity, :float
    add_column :movies, :poster_path, :string
    add_column :movies, :release_date, :date
    add_column :movies, :vote_average, :float
    add_column :movies, :vote_count, :integer
  end
end
