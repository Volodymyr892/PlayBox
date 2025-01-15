import { useRef, useState } from "react";
import Webcam from "react-webcam";
import usePlayerStore from "../../store/playerStore.js";
import css from "./WebCam.module.css"

export default function WebCam() {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);

  const { addSource} = usePlayerStore();

// *--------Початок запису------------/
    const handleStartRecording = () => {
    if (webcamRef.current && webcamRef.current.video.srcObject) {
        const stream = webcamRef.current.video.srcObject;

        mediaRecorderRef.current = new MediaRecorder(stream, {
            mimeType: "video/webm",
        });

        const chunks = [];
        mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
                chunks.push(event.data);
            }
        };

        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(chunks, { type: "video/webm" });
            const url = URL.createObjectURL(blob);

            //*-------Автоматично завантажити файл-------/
            const a = document.createElement("a");
            a.href = url;
            a.download = "recorded-video.webm";
            a.click();

            addSource(url);
        };

        mediaRecorderRef.current.start();
        setRecording(true);
    }};
        // *------Кінець запису--------/
    const handleStopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setRecording(false);
        }
    };

    return (
    <div>
        <Webcam height={347} width={626} ref={webcamRef} />
        <div className={css.container}>
            {recording ? (
                <button className={css.button}  onClick={handleStopRecording}>Зупинити запис</button>
                ) : (
                <button className={css.button} onClick={handleStartRecording}>Почати запис</button>
            )}
        </div>
    </div>
    );
}