import React, { useEffect } from 'react';
import styled from 'styled-components';

import Endscreen from './Endscreen';
import Landing from './Landing';
import Survey from './Survey';
import { useAppDispatch, useAppSelector } from './hooks';
import { SurveyType, PromptType} from './features/models';
import {
  loadQuestions,
  selectSurveyState
} from './features/survey/surveySlice';
import { loadConfig } from './features/config/configSlice';
import { selectAppView } from './features/ui/uiSlice';
import {
  loadProgressConfig
} from './features/playerProgress/playerProgressSlice';
import {
  getNextSurveyIndex,
  getPromptType
} from './features/playerProgress/utils';

const Wrapper = styled.div`
    min-height: 100%;
    font-family: 'Nunito', sans-serif;
    background-color: #F8F8FB;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
`

const App = (props: any) => {
    const appView = useAppSelector(selectAppView);
    const surveyState = useAppSelector(selectSurveyState);
    const dispatch = useAppDispatch();

    useEffect(() => {
      const handleMultiTouch = (e: any): void => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      }
      document.addEventListener('touchmove', handleMultiTouch, {
        passive: false
      });
      return () => {
        document.removeEventListener('touchmove', handleMultiTouch);
      }
    }, [])

    useEffect(() => {
      if(props.config.surveyType) {
        const typeInt = parseInt(props.config.surveyType);
        props.config.surveyType = typeInt;
      }
        dispatch(loadConfig({
            config: props.config,
            contentId: props.contentId,
        }));
        dispatch(loadQuestions({
          questions: props.config.questions,
          contentId: props.contentId
        }));
        dispatch(loadProgressConfig({
          currentIndex: SurveyType.None,
          nextSurvey: getNextSurveyIndex(SurveyType.None),
          promptType: getPromptType(PromptType.Visual)
        }));
    }, [])

    useEffect(() => {
        setTimeout(() => {
            const iframe = window.frameElement;
            var doc = iframe.ownerDocument;
            // @ts-ignore
            var win = doc.defaultView || doc.parentWindow;
            win.dispatchEvent(new Event('resize'))
        }, 10);
    }, [appView])

    return (
        <Wrapper>
            { appView === 'landing' && <Landing /> }
            { appView === 'quiz' && <Survey /> }
            { appView === 'endscreen' && <Endscreen config={props.config} /> }
        </Wrapper>
    )
}

export default App;
