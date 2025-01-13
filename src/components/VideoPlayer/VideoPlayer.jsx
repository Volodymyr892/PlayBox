import { useEffect, useRef } from "react";
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import PlayerStore from "../../store/playerStore";
export default function VideoPlayer(){
    const videoRef = useRef(null);
    const {source, setPlaybackState } = PlayerStore();

    useEffect(()=>{
        const timeout = setTimeout(()=>{
        if (!videoRef.current) return;
        const player = videojs(videoRef.current, {
            autoplay: false,
            controls: true,
            sources: [{src: source, type: 'video/mp4'}],
        })

        player.on('play', ()=> setPlaybackState(true))
        player.on('pause', ()=> setPlaybackState(false))

        return()=>{
            player.dispose();
        };
    },0)
    return () => clearTimeout(timeout);
    },[source, setPlaybackState])
    return(
        <div>
            <video ref={videoRef} className="video-js vjs-default-skin" />
        </div>
    )
}