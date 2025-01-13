import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import PlayerStore from "../../store/playerStore";
import css from "./VideoPlayer.module.css"


export default function VideoPlayer(){
    const videoRef = useRef(null);
    const playerRef = useRef(null); 
    const {source, setPlaybackState, volume, setVolume } = PlayerStore();
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showVolume, setShowVolume] = useState(false);

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            if (!playerRef.current) {
                playerRef.current = videojs(videoRef.current, {
                autoplay: false,
                controls: true,
                controlBar: {
                    playToggle: false,
                    volumePanel: false,
                    fullscreenToggle: false,
                    remainingTimeDisplay: false,
                    currentTimeDisplay: false,
                    timeDivider: false,
                    progressControl: true, 
                },
                });
                playerRef.current.on("timeupdate", () => {
                    setCurrentTime(playerRef.current.currentTime());
                });
                playerRef.current.on("loadedmetadata", () => {
                    setDuration(playerRef.current.duration());
                });
                playerRef.current.on('play', () => setPlaybackState(true));
                playerRef.current.on('pause', () => setPlaybackState(false));
                } else {
                playerRef.current.src({ src: source, type: 'video/mp4' });
                playerRef.current.play();
                }

        return()=>{
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    },0)
    return () => clearTimeout(timeout);
    },[source, setPlaybackState, setVolume ])

    const handlePlayPause = () => {
        if (playerRef.current.paused()) {
            playerRef.current.play();
        } else {
            playerRef.current.pause();
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        playerRef.current.volume(newVolume);
        setVolume(newVolume);
    };
    const handleRewind = () => {
        if (playerRef.current) {
            playerRef.current.currentTime(playerRef.current.currentTime() - 5); // Перемотка на 10 секунд назад
        }
    };
    
    const handleFastForward = () => {
        if (playerRef.current) {
            playerRef.current.currentTime(playerRef.current.currentTime() + 5); // Перемотка на 10 секунд вперед
        }
    };

    const toggleVolumePanel = () => {
        setShowVolume((prev) => !prev);
    };

    const handleFullscreen = () => {
        playerRef.current.requestFullscreen();
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    
    return(
        <div className={css.container}>
        <video 
        width="626"
        height="360"  
        ref={videoRef} 
        className="video-js vjs-default-skin" 
        />

        <div className={css.videoControls}>
            <div>
                <button onClick={handleRewind} className={css.controlButton}>
                    ⏪
                </button>
                <button onClick={handlePlayPause} className={css.controlButton}>
                    {playerRef.current && playerRef.current.paused() ? "▶" : "⏸"}
                </button>
                <button onClick={handleFastForward} className={css.controlButton}>
                    ⏩
                </button>
            </div>
            <span className={css.timeDisplay}>
                {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <div className={css.volumeContainer}>
                <button onClick={toggleVolumePanel} className={css.controlButton}>
                    🔊
                </button>
                {showVolume && (
                    <input
                        type="range"
                        className={css.volumeBar}
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                )}
            </div>
            <button onClick={handleFullscreen} className="control-button">
                ⛶
            </button>
    </div>
</div>
)}