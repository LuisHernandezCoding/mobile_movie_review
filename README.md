# mobile_movie_review

## Previews:
<img width="1680" alt="Screenshot 2023-11-10 at 22 17 55" src="https://github.com/LuisHernandezCoding/mobile_movie_review/assets/112588805/5d9c23d1-d786-433f-abf4-e5e7b740b740">
---
<img width="1680" alt="Screenshot 2023-11-10 at 22 18 11" src="https://github.com/LuisHernandezCoding/mobile_movie_review/assets/112588805/516e7c93-f6ee-4783-9ef1-fb8dec095fcb">
---
<img width="1680" alt="Screenshot 2023-11-10 at 22 18 26" src="https://github.com/LuisHernandezCoding/mobile_movie_review/assets/112588805/1e875e3a-8439-4b5f-bc53-c1cea0ab0889">

## Project Description

This project is a web and mobile application developed using Ruby on Rails and React Native. The application is designed to display movie information using The Movie Database (TMDB) API.

The project structure is divided into two main parts: the backend and the frontend.

### Backend

The backend is located in the `backend` folder and contains the models and controllers necessary to interact with the database and the TMDB API. The models can be found in the `app/models` folder, and the controllers in the `app/controllers` folder.

The main configuration file for the backend is `backend/config/application.rb`. Here, dependencies, middleware, and CORS configuration are set up. It is important to note that the CORS configuration, specifying the allowed origin for HTTP requests, can be found on line 29 of this file.

To install the backend dependencies, run the following command in the `backend` folder:
```
bundle install
```
After installing the dependencies, you can start the Rails server with the following command:
```
rails s
```

### Frontend

The frontend is located in the `frontend` folder and contains the components, models, navigation, and screens of the application. The components can be found in the `app/components` folder, the models in the `app/models` folder, the navigation in the `app/navigation` folder, and the screens in the `app/screens` folder.

To install the frontend dependencies, run the following command in the `frontend` folder:
```
npm install
```
After installing the dependencies, you can run the React Native application with the following command:
```
npx expo start
```

If you want to test the application on the web, you can press the "w" key after running `npx expo start`, and the application will open in Chrome.

## Environment Setup

Before running the project, make sure you have the following installed:

- Ruby (version 3.1.3)
- Node.js
- npm
- Bundler
- Expo CLI (installed globally with `npm install -g expo-cli`)

Additionally, SQLite is used as the database for simplicity.

## Environment Variables

The project uses two environment variables to access the TMDB API. These variables are:

- `TMDB_API_KEY`: TMDB API key. You can obtain a new key [here](https://developer.themoviedb.org/reference/discover-movie).
- `TMDB_API_READ_ACCESS_TOKEN`: TMDB API read access token.

Make sure to configure these environment variables before running the project, they are only needed on the BE part and we are using dot-env for this so creating a new .env file on the backend folder and adding those secrets there will work

## Populating the Database

To populate the database with initial data, run the following command after installing the dependencies and configuring the environment variables:
```
rake db:initial_movies_seed
```

This will create movie records in the database for you to test the application's functionality.

Enjoy the project! If you have any additional questions, feel free to ask.
