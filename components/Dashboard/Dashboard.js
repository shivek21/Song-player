import Sidebar from "../Sidebar/Sidebar"
import Right from "../Right/Right"
import Body from "../Body/Body"
import { playingTrackState } from "../../atoms/playerAtom";
import { useRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-node";
import { useState,useEffect } from "react";
import Player from "../Player/Player";
const spotifyApi=new SpotifyWebApi({
  clientId:process.env.SPOTIFY_CLIENT_ID,
})

function Dashboard() {
  const { data: session } = useSession();
  const { accessToken } = session;
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [showPlayer, setShowPlayer] = useState(false);
  useEffect(() => {
    setShowPlayer(true);
  }, []);
  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);
  return <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
      <Sidebar/>
      <Body chooseTrack={chooseTrack} spotifyApi={spotifyApi}/>
      <Right chooseTrack={chooseTrack} spotifyApi={spotifyApi}/>
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <Player accessToken={accessToken} trackUri={playingTrack.uri}/>
      </div>
  </main>;
}

export default Dashboard;
