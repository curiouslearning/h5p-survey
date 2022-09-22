declare var H5P: any;
// declare var Unity: any;

H5P = H5P || {};
// Unity = Unity || {};

import React, { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks'
import styled from 'styled-components';

import Spinner from '../Spinner/Spinner'
import { AudioPlay, SoundWaves } from '../../icons';
import {
  setPromptStatus
} from '../../features/survey/surveySlice'
import EventService from '../../features/xAPI/eventService';
import { selectIdentifiers } from '../../features/config/configSlice';

interface IAudioPlayer {
    audio: string;
    autoplay: boolean;
}

const Wrapper = styled.div`
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    mergin-right: 20px;
    svg {
        height: 100%;
        width: auto;
    }

    audio {
        display: none;
    }
`

const PlayerButton = styled.button`
    width: 80px;
    height: 80px;
    background: #fff;
    border: 1px solid #DADCE7;
    border-radius: 100px;
    text-align: center;
    padding: 0;
    padding-left: 2px;

    svg {
        pointer-events: none;
    }

    &:hover {
        cursor: pointer;
        box-shadow: 0px 2px 5px rgba(9, 23, 74, 0.3);
    }
`

const AudioPlayer = (props: IAudioPlayer) => {
    const dispatch = useAppDispatch();
    const audioRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const [playing, setPlaying] = useState(false);
    const isWebview = useAppSelector(state => state.config.isWebview);
    const taskAnswered = useAppSelector(state => state.survey.taskAnswered);
    const identifiers = useAppSelector(selectIdentifiers);

    const playAudio = () => {
        var playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
        playPromise.then(() => {
            setPlaying(true);
        }).catch((err: any) => {
            console.log(err);
        });
        }
    }

    const stopAudio = () => {
        setTimeout(() => audioRef.current.stop(), 0);
    }

    const audioFinished = () => {
        setTimeout(() => {
          setPlaying(false);
          dispatch(setPromptStatus(true));
        }, 500);
    }

    const handleAudioErrored = () => {
      console.log('uh-oh');
      if( isWebview ) {
        try {
          const eService = new EventService();
          eService.logEvent('terminated', {
            userId: identifiers.userId,
            organization: identifiers.organization,
            agentName: identifiers.agentName,
            registration: identifiers.registration,
            success: false,
            completion: false
          })
          Unity.call('FatalError');
        } catch (err) {
          console.error(err);
        }
      }
    }

    useEffect(() => {
        console.log(props.audio)
        audioRef.current.addEventListener('ended', audioFinished);
        audioRef.current.addEventListener('canplay', setLoaded(true));
        if (props.autoplay) {
            setTimeout(playAudio, 0);
        }
    }, [props.audio]);

    return (
        <Wrapper>
          {loaded?
            <PlayerButton onClick={playAudio}>
              { (playing) ? <SoundWaves /> : <AudioPlay /> }
            </PlayerButton> : <Spinner />
          }
            <audio ref={audioRef}
              controls src={props.audio}
              onError={handleAudioErrored}>
            </audio>
        </Wrapper>
    )
}

export default AudioPlayer;
