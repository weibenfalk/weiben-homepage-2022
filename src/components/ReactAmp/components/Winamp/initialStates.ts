// Types
import type { StateFlags, StateMetrics } from './types';

export const initialStateFlags: StateFlags = {
  isPlaying: false,
  isPaused: false,
  isDragging: false,
  isDraggingVolume: false,
  isDraggingPan: false,
  isDraggingScrubber: false,
  isShuffle: false,
  isRepeat: false,
  isBars: true,
  isTimeLeft: false
};

export const initialStateMetrics: StateMetrics = {
  volume: 1,
  playtime: 0,
  scrubtime: 0,
  totalTime: 0,
  panValue: 0
};
