import './App.css';
import React, { createContext, useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";

import Navigation from './pages/Navigation';
import Home from './pages/Home';
import QuizFR from "./pages/QuizFR";
import QuizFRSecret from "./pages/QuizFRSecret";
import Grid from './pages/Grid';
import ArtistToArtist from './pages/ArtistToArtist';
import RelatedTo from './pages/RelatedTo';

import { SpotifyApi, AuthorizationCodeWithPKCEStrategy } from '@spotify/web-api-ts-sdk';

export const GlobalContext = createContext();

function App() {
  const [sdkGlobal, setSdkGlobal] = useState(null);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [currentUserTopArtists, setCurrentUserTopArtists] = useState(null);

  const params = new URLSearchParams(window.location.search);
  if (params.get('error') === "access_denied") {
    localStorage.removeItem("spotify-sdk:verifier");
  }

  //daily 
  const today = new Date();
  const todaySeed = ((today.getDate() < 10) ? ("0" + today.getDate()) : today.getDate()) + '/' + ((today.getMonth() + 1 < 10) ? ("0" + (today.getMonth() + 1)) : (today.getMonth() + 1)) + '/' + today.getFullYear();

  const spotifyConnectUser = async () => {
    const auth = new AuthorizationCodeWithPKCEStrategy(
      process.env.REACT_APP_SPOTIFY_CLIENT_ID,
      process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
      [
        "user-read-private",
        "user-read-email",
        "user-top-read",
      ]
    );
    const internalSdk = new SpotifyApi(auth);

    try {
      const { authenticated } = await internalSdk.authenticate();

      if (authenticated) {
        setSdkGlobal(() => internalSdk);
        setCurrentUserProfile(await internalSdk.currentUser.profile());
        const topArtists = await internalSdk.currentUser.topItems("artists", "medium_term", 25);
        setCurrentUserTopArtists(topArtists.items);
      }
    } catch (e) {
      const error = e;
      if (error && error.message && error.message.includes("No verifier found in cache")) {
        console.error("If you are seeing this error in a React Development Environment it's because React calls useEffect twice. Using the Spotify SDK performs a token exchange that is only valid once, so React re-rendering this component will result in a second, failed authentication. This will not impact your production applications (or anything running outside of Strict Mode - which is designed for debugging components).", error);
      } else {
        console.error(e);
      }
    }

  };

  function logoutSpotifyUser() {
    sdkGlobal.logOut();
    window.location.reload();
  }

  function generateRoutes(path, Component) {
    const types = ['day', 'sandbox', 'personal', 'shared'];
    return types.map(type => (
      <Route
        key={`${path}-${type}`}
        path={`/${path}/${type}`}
        element={
          <Component
            key={`${path}-${type}-component`}
            isDaily={type === 'day'}
            isPersonal={type === 'personal'}
            isShared={type === 'shared'}
          />
        }
      />
    ));
  }

  useEffect(() => {
    if (localStorage.getItem("spotify-sdk:AuthorizationCodeWithPKCEStrategy:token") || localStorage.getItem("spotify-sdk:verifier")) {
      spotifyConnectUser();
    } else {
      setSdkGlobal(SpotifyApi.withClientCredentials(process.env.REACT_APP_SPOTIFY_CLIENT_ID, process.env.REACT_APP_SPOTIFY_CLIENT_SECRET));
    }
  }, [setSdkGlobal]);

  return sdkGlobal ? (
    <GlobalContext.Provider value={{ sdkGlobal, currentUserProfile, currentUserTopArtists, logoutSpotifyUser, spotifyConnectUser, todaySeed }}>
      <div className="py-24 w-full h-full max-w-screen-xl flex flex-wrap items-center justify-center mx-auto">
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            {generateRoutes('grid', Grid)}
            {generateRoutes('artist-to-artist', ArtistToArtist)}
            {generateRoutes('related-to', RelatedTo)}
            <Route path="/quiz/fr" element={<QuizFR />} />
            <Route path="/quiz/fr/secret" element={<QuizFRSecret />} />
          </Route>
        </Routes>
      </div>
    </GlobalContext.Provider>
  ) :
    (<></>);
}

export default App;