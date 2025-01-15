import { useCallback, useEffect, useState } from "react"
import PlayerStore from "../../store/playerStore";
import css from "./PlayList.module.css"
import foto from "../../../public/foto.jpg"
import check from "../../assets/check-lg.svg"

export default function PlayList(){
    const [newSource, setNewSource] = useState('');
    const [error, setError] = useState("");
    const [durations, setDurations] = useState({});
    const {
        playlist,
        setSource, 
        addSource,
        toggleWebCam, 
        useWebCam,  
        activeSource, 
        setActiveSource
    } = PlayerStore();

    useEffect(() => {
        playlist.forEach((source) => {
            if (!durations[source]) {
                fetchVideoDuration(source);
            }
        });
        } , [playlist]);

        // *------Вaлідація інтупу-----/

    const validateSource = (source) => {
        const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w\d-./?%&=]*)?$/;
        if (!source.trim()) {
            return "Поле не може бути порожнім.";
        }
        if (!urlRegex.test(source)) {
            return "Невірний формат URL.";
        }
        if (playlist.includes(source)) {
            return "Це джерело вже додано до списку.";
        }
        return "";
        };

        // *------додавання нового відео-----/
        const handleAddSource = () => {
        const validationError = validateSource(newSource);
        if (validationError) {
            setError(validationError);
        } else {
            addSource(newSource);
            setNewSource("");
            setError("");
            fetchVideoDuration(newSource);
        }
        };

        //*---Отримання тривалості відео----/
        const fetchVideoDuration = (source) => {
            const video = document.createElement("video");
        video.src = source;
            video.addEventListener("loadedmetadata", () => {
                setDurations((prev) => ({
                ...prev,
                [source]: formatDuration(video.duration),
                }));
            });
            video.addEventListener("error", () => {
                setDurations((prev) => ({
                ...prev,
                [source]: "Error loading",
                }));
            });
        };

        // *-------Функція для перетворення часу в формат 00:00---/
            const formatDuration = (seconds) => {
                const mins = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
            };

        // *-------Для додавання галочки до відео яке відтворюється----/
            const handleSelectSource =  useCallback((source) => {
                if (source !== activeSource) {
                setSource(source);
                setActiveSource(source);
                }
            }, [activeSource, setSource]);

    return(
        <>
            <div className={css.container}>
                <div className={css.inputContainer}>
                    <input 
                        className={`${css.input} ${error ? css.inputError : ""}`}
                        type="text" 
                        value={newSource}
                        onChange={(e)=> setNewSource(e.target.value)}
                        placeholder="Add video"
                        />
                    <button className={css.button} type="submit" onClick={handleAddSource}>Add </button>
                </div>
                <ul className={css.list}>
                    {playlist.map((item,index)=>(
                    <li className={css.item} key={index}  onClick={() => handleSelectSource(item)}>
                        <div>
                        <div className={css.containerFotoName}>
                            <img
                                className={css.thumbnail}
                                src={foto}
                                alt="foto"
                                />
                                <div className={css.containerName}>
                                    <p className={css.title}>
                                        {item.length > 30 ? `${item.slice(0, 30)}...` : item}
                                    </p>
                                    <p className={css.time}>
                                        {durations[item] ? durations[item] : "Loading..."}
                                    </p>
                                </div>
                        </div>
                        </div>
                        <div
                className={`${css.selected} ${
                    activeSource === item ? css.selectedActive : ""
                }`}
                >
                {activeSource === item && <img src={check} alt="check" />}
                </div>
                    </li>
                    ))}
                </ul>
            </div>
            <button
            className={css.toggleButton}
            onClick={toggleWebCam}
            >
                {useWebCam ? "Повернутись до відео" : "Запуск веб-камери"}
            </button>
        </>
    )
}