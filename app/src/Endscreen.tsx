declare var H5P: any;

H5P = H5P || {};

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const H5PDispatcher = new H5P.EventDispatcher();

import { LinkButton, Button, Pirate, Scorebar } from './components';
import { Eye, Retry, Close } from './icons';
import { SurveyType } from './features/models';
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
    background-color: #fff;
    max-width: 620px;
    width: 90%;
    display: inline-flex;
    flex: 1;
    padding: 40px;
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 20px;
    box-shadow: 0px 7px 25px -10px rgba(9, 23, 74, 0.3);
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

    const restartSurvey = () => {
        dispatch(resetSurvey());
        dispatch(setAppView('landing'));
    }

    useEffect(() => {
        dispatch(setSurveyCompleted())
        // Log that the quiz has been completed
        eService.logEvent('terminated', {
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
        if (nextSurvey !== SurveyType.None) {
          const result = createRequirementsObject();
          if (satisfiesPreReqs(result, nextSurvey)) {
            let url = getSurveyURL(nextSurvey);
            let params = window.location.search;
            url += params;
            window.top.location = url;
          } else if(!isWebview) {
            window.top.location = getSurveyURL(SurveyType.None);
          } else {
            Unity.call('close');
          }
        }
        else if (!isWebview) {
          window.top.location = getSurveyURL(SurveyType.None);
        }
        else {
          Unity.call('close');
        }
      } catch (e) {
      if (e.message !== 'Unity is not defined') {
        throw e;
      }
    }
  }

    return (
        <Wrapper>
            <PirateWrapper>
                <Pirate animate={false} />
            </PirateWrapper>
            <h2>{uiText.resultText}:</h2>
            <Actions>
                { <Button transparent iconLeft onClick={handleClose()}>
                    <Close /> { uiText.closeButtonText }
                  </Button>
                }
            </Actions>
        </Wrapper>
    )
}

export default Endscreen;
