import React from 'react';
// Components
import BaseImages from '../../components/BaseImages/BaseImages';
import ControlButtonGroup from '../../components/ControlButtonGroup/ButtonGroup';
import ShufRepButton from '../../components/ShufRepButton/ShufRepButton';
import EqPlButton from '../../components/EqPlButton/EqPlButton';
import TextDisplay from '../../components/TextDisplay/TextDisplay';
import MonoStereo from '../../components/MonoStereo/MonoStereo';
import TimeDisplay from '../../components/TimeDisplay/TimeDisplay';
import VolumeControl from '../../components/VolumeControl/VolumeControl';
import PanControl from '../../components/PanControl/PanControl';
import AudioVisualiser from '../../components/AudioVisualiser/AudioVisualiser';
import TextCanvas from '../../components/TextCanvas/TextCanvas';
import Scrubber from '../../components/Scrubber/Scrubber';
// Hooks
import { useCreateAudio } from '../../hooks/useCreateAudio';
import { useCreateAnalyser } from '../../hooks/useCreateAnalyser';
import { useCallbacks } from './useCallbacks';
import { useStateContext } from '../../context';
// Tracks
import { tracks } from '../../tracks';
// Types
import { VisualiserType } from '../../components/AudioVisualiser/AudioVisualiser';
import { ShufRepButtonType } from '../../components/ShufRepButton/ShufRepButton';
import { EqPlButtonType } from '../../components/EqPlButton/EqPlButton';
// Styles
import { Wrapper, FrequenciesWrapper } from './Winamp.styles';

const Winamp = () => {
  const audioRef = React.useRef<HTMLMediaElement>(null);

  const { context, source, panNode, play, stop, pause } = useCreateAudio(audioRef);
  const analyser = useCreateAnalyser(context, source);
  const { currentTrack, flags, setFlags, metrics, setMetrics } = useStateContext();

  const trackNr = tracks.findIndex(track => track.title === currentTrack.title);
  const callbacks = useCallbacks(audioRef, tracks, trackNr, play, pause, stop);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = metrics.volume;
      panNode?.pan.setValueAtTime(metrics.panValue, metrics.playtime);
    }
  }, [metrics.volume, metrics.panValue, metrics.playtime]);

  return (
    <Wrapper isPaused={flags.isPaused}>
      <audio onTimeUpdate={callbacks.handleTimeUpdate} onEnded={callbacks.handleOnEnd} ref={audioRef}>
        <source src={currentTrack.file} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <BaseImages isPlaying={flags.isPlaying} isPaused={flags.isPaused} />
      <ControlButtonGroup
        className='button-group'
        handlePlay={callbacks.handlePlay}
        handleStop={callbacks.handleStop}
        handlePause={callbacks.handlePause}
        handlePreviousTrack={() => callbacks.handleTrackChange(trackNr - 1)}
        handleNextTrack={() => callbacks.handleTrackChange(trackNr + 1)}
      />
      <div className='shuf-rep-buttons'>
        <ShufRepButton
          type={ShufRepButtonType.shuffle}
          active={flags.isShuffle}
          clickHandler={() => setFlags(prev => ({ ...prev, isShuffle: !prev.isShuffle }))}
        />
        <ShufRepButton
          type={ShufRepButtonType.repeat}
          active={flags.isRepeat}
          clickHandler={() => setFlags(prev => ({ ...prev, isRepeat: !prev.isRepeat }))}
        />
      </div>
      <div className='eq-pl-buttons'>
        <EqPlButton type={EqPlButtonType.eq} active={false} clickHandler={() => console.log('Eq Button!')} />
        <EqPlButton type={EqPlButtonType.pl} active={false} clickHandler={() => console.log('Pl Button!')} />
      </div>
      {analyser && analyser.analyser && analyser.dataArray && (flags.isPlaying || flags.isPaused) ? (
        <div onClick={callbacks.handleVisualisationChange}>
          <AudioVisualiser
            className='spectrum-analyser'
            isPlaying={flags.isPlaying}
            analyser={analyser.analyser}
            dataArray={analyser.dataArray}
            bufferLength={analyser.bufferLength}
            type={flags.isBars ? VisualiserType.BAR : VisualiserType.OSC}
          />
        </div>
      ) : null}
      <TextDisplay
        className='text-scroll'
        text={callbacks.handleDisplayText()}
        isScroll={!flags.isDraggingVolume && !flags.isDraggingPan && !flags.isDraggingScrubber}
      />
      <FrequenciesWrapper>
        <TextCanvas text={currentTrack.bitRate.toString()} />
        <TextCanvas text={currentTrack.sampleRate.toString()} />
      </FrequenciesWrapper>
      <MonoStereo stereo={true} className='mono-stereo' />
      {flags.isPlaying || flags.isPaused ? (
        <TimeDisplay
          className='time-display'
          isTimeLeft={flags.isTimeLeft}
          setIsTimeLeft={isTimeLeft => setFlags(prev => ({ ...prev, isTimeLeft }))}
          totalTime={metrics.totalTime}
          playtime={metrics.playtime}
        />
      ) : null}
      <VolumeControl
        className='volume-control'
        volume={metrics.volume}
        setVolume={volume => setMetrics(prev => ({ ...prev, volume }))}
        setIsDraggingVolume={isDraggingVolume => setFlags(prev => ({ ...prev, isDraggingVolume }))}
      />
      <PanControl
        className='balance-control'
        panValue={metrics.panValue}
        setPanValue={panValue => setMetrics(prev => ({ ...prev, panValue }))}
        setIsDraggingBalance={isDraggingPan => setFlags(prev => ({ ...prev, isDraggingPan }))}
      />
      <Scrubber
        className='scrubber'
        scrubtime={metrics.scrubtime}
        setScrubtime={scrubtime => setMetrics(prev => ({ ...prev, scrubtime }))}
        totalTime={metrics.totalTime}
        setIsDraggingScrubber={isDraggingScrubber => setFlags(prev => ({ ...prev, isDraggingScrubber }))}
        displayHandle={flags.isPlaying || flags.isPaused}
        handleScrubRelease={callbacks.handleScrubRelease}
      />
    </Wrapper>
  );
};

export default Winamp;
