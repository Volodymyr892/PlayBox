import PlayList from "./PlayList/PlayList";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import WebCam from "./Webcam/Webcam";

export default function App() {
  return (
    <>App
    <VideoPlayer/>
    <div>
      <h2>Play List</h2>
      <PlayList/>
    </div>
    <div>
      <h2>WEbcam</h2>
      <WebCam/>
    </div>
  </>
  )
}
