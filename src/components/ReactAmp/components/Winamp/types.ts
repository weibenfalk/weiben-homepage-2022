export interface StateFlags {
  isPlaying: boolean;
  isPaused: boolean;
  isDragging: boolean;
  isDraggingVolume: boolean;
  isDraggingPan: boolean;
  isDraggingScrubber: boolean;
  isShuffle: boolean;
  isRepeat: boolean;
  isBars: boolean;
  isTimeLeft: boolean;
};

export interface StateMetrics {
  volume: number;
  playtime: number;
  scrubtime: number;
  totalTime: number;
  panValue: number;
};

export interface Track {
  artist: string;
  title: string;
  file: string;
  sampleRate: number;
  bitRate: number;
};