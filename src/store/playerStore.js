
import create from 'zustand';

const PlayerStore = create((set,get) => ({
    source: 'video1.mp4',
    playlist: ['video1.mp4', 'video2.mp4', 'video3.mp4','video4.mp4','video3.mp4','video4.mp4' ],
    isPlaying: false,
    volume: 1.0,
    useWebCam: false,
    activeSource: "",
    setActiveSource: (newSource) => set({ activeSource: newSource }),
    setSource: (source) => set({ source }),
    addSource: (newSource) =>
        set((state) => ({ playlist: [...state.playlist, newSource] })),
    setPlaybackState: (isPlaying) => set({ isPlaying }),
    setVolume: (volume) => set({ volume }),
    toggleWebCam: () => set((state) => ({ useWebCam: !state.useWebCam })),
    handleVideoEnd: () => {
        const { playlist, source, setSource, setActiveSource } = get();
        const currentIndex = playlist.indexOf(source);
        const nextIndex = (currentIndex + 1) % playlist.length;
        const nextSource = playlist[nextIndex];

        setActiveSource(nextSource);
        setSource(nextSource);
    },
}));

export default PlayerStore;