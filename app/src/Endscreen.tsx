declare var H5P: any;

H5P = H5P || {};

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const H5PDispatcher = new H5P.EventDispatcher();

import { LinkButton, Button, Pirate, Scorebar, ThreeMonsters } from './components';
import { Eye, Retry, Close } from './icons';
import { ContentType } from './features/models';
import { useAppDispatch, useAppSelector } from './hooks';
import {
  loadPreReqs,
  satisfiesPreReqs,
  createRequirementsObject,
  getSurveyURL
} from './features/playerProgress/utils'

import {
    // Actions
    setSurveyCompleted,
    resetSurvey,
    // Selectors,
} from './features/survey/surveySlice';
import {
  selectContentId,
  selectUiText,
  selectIsWebView,
  selectIdentifiers
} from './features/config/configSlice';
import { setAppView } from './features/ui/uiSlice';
import EventService from './features/xAPI/eventService';

const Wrapper = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;
    background-image: url(https://curiousreader.org/wp-content/uploads/bg_crayon-1.png);
    background-position: top center;
    background-size: contain;
    background-repeat: no-repeat; 
`

const ThreeMonstersWrapper = styled.div`
    max-width: 300px;
    padding-bottom: 50px;
    svg {
        width: 100%;
        height: auto;
    }
`

const PirateWrapper = styled.div`
    position: relative;
    top: -120px;
    margin-bottom: -120px;
    text-align: center;
    height: 220px;
    width: 100%;

    svg {
        height: 200px;
    }
`

const Actions = styled.div`
    display: flex;
    margin-top: 35px;

    button {
        margin-right: 20px;
    }
`

const Endscreen = (props: any) => {
    const identifiers = useAppSelector(selectIdentifiers);
    const surveyId = useAppSelector(state => state.config.surveyId);
    const eService = new EventService();
    const dispatch = useAppDispatch();
    const h5pId = useAppSelector(selectContentId);
    const uiText = useAppSelector(selectUiText);
    const isWebview = useAppSelector(selectIsWebView);
    const surveyStartTime = useAppSelector((state) => state.survey.startTime);
    const [linkActive, setLinkActive] = useState(false);
    const currentSurvey = useAppSelector((state) => state.playerProgress.currentIndex);
    const nextSurvey = useAppSelector((state) => state.playerProgress.nextSurvey);
    const nextContent = useAppSelector((state) => state.playerProgress.nextContent);

    const restartSurvey = () => {
        dispatch(resetSurvey());
        dispatch(setAppView('landing'));
    }

    useEffect(() => {
        console.log('Endscreen: useEffect Completion event!');
        dispatch(setSurveyCompleted());
        // Log that the quiz has been completed
        eService.logEvent('completed', {
          userId: identifiers.userId,
          organization: identifiers.organization,
          agentName: identifiers.agentName,
          registration: identifiers.registration,
          survey: surveyId,
          duration: Date.now() - surveyStartTime,
          completion: true,
          success: true
        });
    }, []);

    const handleClose = () => {
      console.log('closing');
      try {
        // if (nextSurvey !== ContentType.None) {
        //   const result = createRequirementsObject();
        //   if (satisfiesPreReqs(result, nextSurvey, nextContent)) {
        //     let url = getSurveyURL(nextSurvey, nextContent);
        //     let params = window.location.search;
        //     url += params;
        //     window.top.location = url;
        //   } else if(!isWebview) {
        //     window.top.location = getSurveyURL(ContentType.None, nextContent);
        //   } else {
        //     Unity.call('close');
        //   }
        // }
        // else if (!isWebview) {
        //   window.top.location = getSurveyURL(ContentType.None, nextContent);
        // }
        // else {
        if (typeof Unity !== 'undefined') {
            Unity.call('close');
        }
        // }
      } catch (e) {
      if (e.message !== 'Unity is not defined') {
        throw e;
      }
    }
  }

    return (
        <Wrapper>
            <ThreeMonstersWrapper>
                {/* <Pirate animate={false} />
                 */}
                <ThreeMonsters />
            </ThreeMonstersWrapper>
            {/* <h2>{uiText.resultText}:</h2> */}
            <Actions>
                { <Button onClick={handleClose}>
                    <Close /> 
                    {/* { uiText.closeButtonText } */}
                  </Button>
                }
            </Actions>
        </Wrapper>
    )
}

export default Endscreen;
