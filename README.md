# Spotify Mini-Games

Welcome to **Spotify Mini-Games**, a web application that leverages the Spotify API to offer a collection of music-inspired mini-games. These games are influenced by popular games like **Moviegrid**, **Movietomovie**, and **Contexto**, bringing a fun and interactive experience to music lovers.

## Features

- **Interactive Mini-Games**: Enjoy a variety of mini-games inspired by popular games.
- **Spotify Integration**: Connect your Spotify account to access your playlists, liked songs, and more.
- **Daily Challenges**: Test your skills with new challenges available every day, offering fresh content and new ways to enjoy your favorite music.
- **Dynamic Challenges**: Experience different challenges each time you play, with game content based on Spotify's vast music library.
- **User-Friendly Interface**: Designed with React for a smooth, responsive, and engaging user experience.

## Available Games

1. **RapGrid**: Inspired by Moviegrid, this game challenges you to find connections between songs, albums, artists and categories.
2. **Artist-to-Artist**: Similar to Movietomovie, this game involves linking songs based on artists, genres, and other attributes.
3. **Related to**: A word-based guessing game like Contexto, but with artist names.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/spotify-mini-games.git
    cd spotify-mini-games
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
   Create a `.env` file in the root of your project with your Spotify API credentials:
    ```plaintext
    REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
    REACT_APP_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
    REACT_APP_REDIRECT_URI=http://localhost:3000/callback
    ```

4. **Run the application**:
    ```bash
    npm start
    ```

5. **Open your browser**: Navigate to `http://localhost:3000` to start playing.

## Dependencies

- **React**: For building the user interface.
- **Spotify Web API**: For accessing Spotify's music library.
- **React Router**: For managing navigation between games.
- **Styled Components**: For styling the app components.

## Configuration

Make sure to configure your Spotify API credentials in the `.env` file. You will need to register your app on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) to obtain your `client_id` and `client_secret`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to Spotify for providing the API that powers this app.
- Inspired by the creativity of Moviegrid, Movietomovie, and Contexto.
