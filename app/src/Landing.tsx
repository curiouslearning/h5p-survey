declare var H5P: any;

H5P = H5P || {};

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from './hooks';
import { setAppView } from './features/ui/uiSlice';
import {
  loadProgressConfig
} from './features/playerProgress/playerProgressSlice';
import {
  loadPreReqs,
  getNextSurveyIndex
} from './features/playerProgress/utils';
import {
    loadNextTask,
    // Selectors
} from './features/survey/surveySlice';
import {
  setIsWebview,
  setUser,
  selectSurveyConfig,
  selectUiText,
  selectIsWebView
} from './features/config/configSlice';

import EventService from './features/xAPI/eventService';

import { Button, PeekingMonster, ThreeMonsters } from './components';
import { Play } from './icons';
const $ = H5P.JQuery;

const Wrapper = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;
`

const ThreeMonstersWrapper = styled.div`
    max-width: 320px;
    padding-bottom: 50px;
    svg {
        width: 100%;
        height: auto;
    }
`

const StartWrapper = styled.div`
    margin-bottom: 120px;
    position: relative;
    z-index: 2;
`

const PeekingWrapper = styled.div`
    position: absolute;
    bottom: 0;
    height: 150px;
    padding-top: 150px;
    z-index: 1;
`

const Landing = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const utmParams = Object.fromEntries(urlSearchParams);
    const eService = new EventService();
    const dispatch = useAppDispatch();
    const surveyConfig = useAppSelector(selectSurveyConfig);
    const uiText = useAppSelector(selectUiText);
    const isWebview = useAppSelector(selectIsWebView);
    const ipToken = useAppSelector((state) => state.config.ipToken);


    const initializeAgentMetadata = (utmParams: any) => {
      fetch(`https://ipinfo.io/json?token=${ipToken}`)
      .then((response) => {
          if(!response.ok) {
            throw Error(response.statusText);
          }
        return response.json()
      }).then((jsonResponse)  => {
        let loc;
        if(jsonResponse) {
          loc = {
            city: jsonResponse.city,
            region: jsonResponse.region,
            country: jsonResponse.country,
            lat: jsonResponse.lat,
            lng: jsonResponse.lng
          };
        }
        eService.logEvent('agentProfileUpdated', {
          ...utmParams,
          ...loc
        });
        return;
      }).catch((err) => {
        console.error(`agent profile failed to update! encountered error ${err.msg}`);
      });
    }
    useEffect(() => {
      window.dispatchEvent(new Event('resize'));
    }, [])

    //integrate with Unity WebView for embedded surveys
    if (isWebview) {
      try {
        const controls = document
          .getElementsByClassName("h5p-content-controls")[0] as HTMLElement;
        controls.style.visibility = "hidden";
        const actions = document
          .getElementsByClassName('h5p-actions')[0] as HTMLElement
        actions.style.visibility = "hidden";
        Unity.call('loaded');
      } catch(e) {
        if(e.message !== 'Unity is not defined') {
          console.warn(e.message);
        }

      }
    }


    return (
        <Wrapper>
            <ThreeMonstersWrapper>
                <ThreeMonsters />
            </ThreeMonstersWrapper>
            <StartWrapper>
                <Button onClick={() => {
                    if(utmParams.uuid) {
                      dispatch(setUser({
                        userId: utmParams.uuid,
                        organization: utmParams.organization
                      }));
                    }
                    if (utmParams.hasOwnProperty('isWebview')) {
                      dispatch(setIsWebview(utmParams.isWebview === "true"));
                    }
                    initializeAgentMetadata(utmParams);
                    dispatch(loadNextTask());
                    dispatch(setAppView('quiz'))
                    eService.logEvent('initialized', {
                      userId: utmParams.uuid,
                      organization: utmParams.organization,
                      survey: surveyConfig.surveyId,
                    });
                }} success>{uiText.playButtonText} <Play /></Button>
            </StartWrapper>
            <PeekingWrapper>
                <PeekingMonster />
            </PeekingWrapper>
        </Wrapper>
    )
}

export default Landing;
