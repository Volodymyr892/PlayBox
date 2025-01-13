
import create from 'zustand';

const PlayerStore = create((set) => ({
    source: 'video1.mp4',
    playlist: ['video1.mp4', 'video2.mp4', 'video3.mp4'],
    isPlaying: false,
    volume: 1.0,
    setSource: (source) => set({ source }),
    addSource: (newSource) =>
        set((state) => ({ playlist: [...state.playlist, newSource] })),
    setPlaybackState: (isPlaying) => set({ isPlaying }),
    setVolume: (volume) => set({ volume }),
}));

export default PlayerStore;