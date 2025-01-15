import PlayerStore from "../../store/playerStore";
import PlayList from "../PlayList/PlayList";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import WebCam from "../Webcam/Webcam";
import css from "./App.module.css"

export default function App(){
    const {useWebCam} = PlayerStore();
  return (
    <div className={css.container}>
      <div className={css.containerPlayerList}>
      {useWebCam ? <WebCam /> : <VideoPlayer />}
        <div>
          <PlayList/>
        </div>
      </div>
  </div>
  )
}
