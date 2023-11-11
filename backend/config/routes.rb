# frozen_string_literal: true

Rails.application.routes.draw do
  resources :movies, only: %i[index show] do
    resources :reviews, only: %i[index create]
  end

  resources :reviews, only: [:index]
end
