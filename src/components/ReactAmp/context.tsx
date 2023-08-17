import React from 'react';
// Tracks
import { tracks } from './tracks';
// Initial States
import { initialStateFlags, initialStateMetrics } from './components/Winamp/initialStates';
// Types
import type { Track, StateFlags, StateMetrics } from './components/Winamp/types';

type StateContextType = {
  currentTrack: Track;
  setCurrentTrack: React.Dispatch<React.SetStateAction<Track>>;
  flags: StateFlags;
  setFlags: React.Dispatch<React.SetStateAction<StateFlags>>;
  metrics: StateMetrics;
  setMetrics: React.Dispatch<React.SetStateAction<StateMetrics>>;
};

const StateContext = React.createContext<null | StateContextType>(null);

type Props = {
  children: React.ReactNode;
};

export const StateContextProvider = ({ children }: Props) => {
  const [currentTrack, setCurrentTrack] = React.useState(() => tracks[0]);
  const [flags, setFlags] = React.useState(() => initialStateFlags);
  const [metrics, setMetrics] = React.useState(() => initialStateMetrics);

  return (
    <StateContext.Provider value={{ currentTrack, setCurrentTrack, flags, setFlags, metrics, setMetrics }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const stateContext = React.useContext(StateContext);

  if (!stateContext) throw new Error('You need to use this hook inside a context provider!');

  return stateContext;
};
