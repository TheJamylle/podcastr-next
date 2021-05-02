import { createContext, ReactNode, useState } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Array<Episode>;
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }
  
  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function playNext() {
    const nextIndex = currentEpisodeIndex + 1;
    if (nextIndex >= episodeList.length) {
      return;
    }
    setCurrentEpisodeIndex(currentEpisodeIndex + 1);
  }

  function playPrevious() {
    const nextIndex = currentEpisodeIndex - 1;
    if (nextIndex < 0) {
      return;
    }
    setCurrentEpisodeIndex(currentEpisodeIndex - 1);
  }

  return (
      <PlayerContext.Provider
          value={{
              episodeList,
              currentEpisodeIndex,
              isPlaying,
              play,
              playList,
              playNext,
              playPrevious,
              togglePlay,
              setPlayingState
          }}>
          {children}
      </PlayerContext.Provider>
  )
}