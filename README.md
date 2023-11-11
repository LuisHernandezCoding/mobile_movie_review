# mobile_movie_review

## Project Description

This project is a web and mobile application developed using Ruby on Rails and React Native. The application is designed to display movie information using The Movie Database (TMDB) API.

The project structure is divided into two main parts: the backend and the frontend.

### Backend

The backend is located in the `backend` folder and contains the models and controllers necessary to interact with the database and the TMDB API. The models can be found in the `app/models` folder, and the controllers in the `app/controllers` folder.

The main configuration file for the backend is `backend/config/application.rb`. Here, dependencies, middleware, and CORS configuration are set up. It is important to note that the CORS configuration, specifying the allowed origin for HTTP requests, can be found on line 29 of this file.

To install the backend dependencies, run the following command in the `backend` folder:
bundle install
