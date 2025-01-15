import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import PlayerStore from "../../store/playerStore";
import css from "./VideoPlayer.module.css"
import  forward from "../../assets/forward.svg"
import back from "../../assets/back.svg"
import pusc from '../../assets/pusc.svg'
import pause from "../../assets/pause.svg"
import volumeSvg from "../../assets/Volume.svg"
import fullScreen from "../../assets/fullScreen.svg"


export default function VideoPlayer(){
    const videoRef = useRef(null);
    const playerRef = useRef(null); 
    const {source,
        setPlaybackState, 
        volume, 
        setVolume, 
        playlist, 
        handleVideoEnd 
    } = PlayerStore();
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showVolume, setShowVolume] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            console.log("Playlist:", playlist);
            console.log("Current Source:", source);
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
                playerRef.current.on("ended", handleVideoEnd);
                playerRef.current.on("timeupdate", () => {
                    setCurrentTime(playerRef.current.currentTime());
                });
                playerRef.current.on("loadedmetadata", () => {
                    setDuration(playerRef.current.duration());
                });
                playerRef.current.on('play', () => {
                    setPlaybackState(true);
                    setIsPlaying(true);
                });
                playerRef.current.on('pause', () => {
                    setPlaybackState(false);
                    setIsPlaying(false);
                });
                } else {
                    if (playerRef.current && playerRef.current.src()!== source) {
                        playerRef.current.src({ src: source, type: 'video/mp4' });
                        playerRef.current.play();
                    }
                }

        return()=>{
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    },0)
    return () => clearTimeout(timeout);
    },[source, setPlaybackState, setVolume, handleVideoEnd ])


    // *------Перемотування----------------/
    const handleRewind = () => {
        if (playerRef.current) {
            playerRef.current.currentTime(playerRef.current.currentTime() - 5); 
        }
    };
    const handleFastForward = () => {
        if (playerRef.current) {
            playerRef.current.currentTime(playerRef.current.currentTime() + 5); 
        }
    };

    // *--------Пауза-Пуск---------------/
        const handlePlayPause = () => {
        if (playerRef.current.paused()) {
            playerRef.current.play();
        } else {
            playerRef.current.pause();
        }
    };
    
    // *--------Формат часу -------------/
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    // *--------Гучність-----------------/
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        playerRef.current.volume(newVolume);
        setVolume(newVolume);
        const volumeBar = e.target;
        const value = (volumeBar.value - volumeBar.min) / (volumeBar.max - volumeBar.min) * 100;
        volumeBar.style.setProperty("--value", `${value}%`);
    };
    const toggleVolumePanel = () => {
        setShowVolume((prev) => !prev);
    };

    // *--------Повноекранний режим-----/
    const handleFullscreen = () => {
        playerRef.current.requestFullscreen();
    };

    return(
        <div className={css.container}>
        <video 
        width="626"
        height="347"  
        ref={videoRef} 
        className="video-js vjs-default-skin" 
        />

        <div className={css.videoControls}>

            <div className={css.containerBtn}>
                <button onClick={handleRewind} className={css.controlButton}>
                    <img src={back} alt="back" />
                </button>
                <button onClick={handlePlayPause} className={css.controlButton}>
                {isPlaying ? (
                    <img src={pause} alt="pause" width={16} />
                ) : (
                    <img src={pusc} alt="play" />
                )}
                </button>
                <button onClick={handleFastForward} className={css.controlButton}>
                    <img src={forward} alt="forvard" />
                </button>
                <p className={css.timeDisplay}>
                {formatTime(currentTime)} / {formatTime(duration)}
                </p>
            </div>

            <div className={css.contoinerVolume}>
                <div className={css.volumeContainer}>
                    <button onClick={toggleVolumePanel} className={css.controlButton}>
                        <img src={volumeSvg} alt="volome" />
                    </button>
                    {showVolume && (
                        <div className={css.containerRange}>
                            <input
                                type="range"
                                className={css.volumeBar}
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={handleVolumeChange}
                            />
                        </div>
                    )}
                </div>
                <button onClick={handleFullscreen} className={css.controlButton}>
                    <img src={fullScreen} alt="fullScreen" />
                </button>
            </div>
    </div>
</div>
)}