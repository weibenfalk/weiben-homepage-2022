// Context
import { useStateContext } from '../../context';
import { getTotalTimeInMinsAndSecs } from '../../helpers';
// Types
import type { Track } from './types';

export const useCallbacks = (audioRef: any, tracks: Track[], trackNr: any, play: any, pause: any, stop: any) => {
  const { currentTrack, setCurrentTrack, flags, setFlags, metrics, setMetrics } = useStateContext();

  const handleDisplayText = () => {
    const percentPlayed = Math.round((metrics.scrubtime / metrics.totalTime) * 100);
    const totalTimeWithZero = getTotalTimeInMinsAndSecs(metrics.totalTime);
    const totalTimeWithoutZero = getTotalTimeInMinsAndSecs(metrics.totalTime, false);

    return flags.isDraggingVolume
      ? `Volume: ${Math.round(metrics.volume * 100)}%`
      : flags.isDraggingPan
      ? `Balance: ${
          (metrics.panValue < 0.2 && metrics.panValue >= 0) || (metrics.panValue > -0.2 && metrics.panValue < 0)
            ? ''
            : Math.abs(Math.round(metrics.panValue * 100)) + '%'
        } ${metrics.panValue < 0 ? 'Left' : metrics.panValue === 0 ? 'center' : 'right'}`
      : flags.isDraggingScrubber
      ? `Seek to: ${getTotalTimeInMinsAndSecs(
          (metrics.scrubtime / metrics.totalTime) * metrics.totalTime
        )}/${totalTimeWithZero} (${percentPlayed}%)`
      : `${currentTrack.title} - ${currentTrack.artist} (${totalTimeWithoutZero}) *** `;
  };

  const handlePlay = () => {
    play();
    // If we're already playing a track, rewind to start of song when pressing play
    if (flags.isPlaying && audioRef.current) audioRef.current.currentTime = 0;
    setFlags(prev => ({ ...prev, isPlaying: true, isPaused: false }));
  };

  const handleStop = () => {
    setFlags(prev => ({ ...prev, isPlaying: false, isPaused: false }));
    stop();
  };

  const handlePause = () => {
    if (flags.isPlaying) {
      pause();
      setFlags(prev => ({ ...prev, isPlaying: false, isPaused: true }));
      return;
    }

    play();
    setFlags(prev => ({ ...prev, isPlaying: true, isPaused: false }));
  };

  const handleTrackChange = (newTrack: number): void => {
    let _newTrack = 0;

    if (flags.isShuffle) {
      let randomTrackNr = trackNr;

      while (randomTrackNr === trackNr) randomTrackNr = Math.floor(Math.random() * tracks.length);
      _newTrack = randomTrackNr;
    } else if (newTrack === tracks.length) {
      return;
    } else if (newTrack > 0) {
      _newTrack = newTrack;
    }

    setCurrentTrack(tracks[_newTrack]);

    audioRef.current?.load();

    if (flags.isPlaying || flags.isPaused) {
      play();
      setFlags(prev => ({ ...prev, isPlaying: true, isPaused: false }));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const roundedTime = Math.floor(audioRef.current.currentTime);
      const roundedTotalTime = Math.floor(audioRef.current.duration);

      setMetrics(prev => ({ ...prev, playtime: roundedTime, totalTime: roundedTotalTime }));

      if (!flags.isDragging) setMetrics(prev => ({ ...prev, scrubtime: roundedTime }));
    }
  };

  const handleOnEnd = () => {
    if (audioRef.current && flags.isRepeat) {
      audioRef.current.currentTime = 0;
      play();
      return;
    }

    handleTrackChange(trackNr + 1);
  };

  const handleScrubRelease = (value: number) => {
    const _playTime = (value / 100) * metrics.totalTime;
    if (audioRef.current) audioRef.current.currentTime = _playTime;
  };

  const handleVisualisationChange = () => setFlags(prev => ({ ...prev, isBars: !prev.isBars }));

  return {
    handleDisplayText,
    handlePlay,
    handleStop,
    handlePause,
    handleTrackChange,
    handleTimeUpdate,
    handleOnEnd,
    handleScrubRelease,
    handleVisualisationChange
  };
};
