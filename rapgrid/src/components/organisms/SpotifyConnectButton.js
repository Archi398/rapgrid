import React, { useContext } from 'react';
import { GlobalContext } from "../../App";

export default function SpotifyConnectButton() {
  const { logoutSpotifyUser, spotifyConnectUser, currentUserProfile } = useContext(GlobalContext);

  return currentUserProfile
    ? (
      <button type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" onClick={logoutSpotifyUser}>Se déconnecter</button>
    )
    : (
      <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center" onClick={spotifyConnectUser} >Connecte toi avec Spotify</button>
    );

}