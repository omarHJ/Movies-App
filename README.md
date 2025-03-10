
# Movies App

## Table of Contents
- [Live Demo](#live-demo)
- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Live Demo
Check out the live demo of the Movies App [here](https://movies-app-v2-plum.vercel.app/).

## Description
Movies App is a React application that allows users to search for movies and view details about them. It uses The Movie Database (TMDb) API to fetch movie data.

## Features
- Search for movies
- View popular movies
- View movie details including title, release date, rating, genres, and overview

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/movies-app.git
    cd movies-app
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Create a .env file in the root directory and add your TMDb API key:
    ```sh
    VITE_API_KEY=your_api_key
    VITE_API_URL_POPULAR=https://api.themoviedb.org/3/movie/popular
    VITE_API_URL_SEARCH=https://api.themoviedb.org/3/search/movie
    ```

## Usage
1. Start the development server:
    ```sh
    npm run dev
    ```
2. Open your browser and navigate to http://localhost:5173 to access the application.

## Scripts
- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run preview`: Preview the production build locally.

## Dependencies
- react
- react-router
- react-router-dom
- axios
- bootstrap
- @fortawesome/react-fontawesome
- @fortawesome/free-solid-svg-icons
- @fortawesome/free-regular-svg-icons
