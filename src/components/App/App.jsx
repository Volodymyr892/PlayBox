import PlayList from "../PlayList/PlayList";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import WebCam from "../Webcam/Webcam";
import css from "./App.module.css"

export default function App() {
  return (
    <div className={css.container}>
    <div className={css.containerPlayerList}>
      <VideoPlayer/>
      <div>
        <PlayList/>
      </div>
    </div>
    <div>
      <h2>WEbcam</h2>
      <WebCam/>
    </div>
  </div>
  )
}
