import React, { useEffect } from 'react';
import styled from 'styled-components';
import Endscreen from './Endscreen';
import { loadConfig } from './features/config/configSlice';
import { ContentType } from './features/models';
import {
  loadProgressConfig
} from './features/playerProgress/playerProgressSlice';
import {
  getNextSurveyIndex,
  getPromptType
} from './features/playerProgress/utils';
import {
  loadQuestions,
  selectSurveyState
} from './features/survey/surveySlice';
import { selectAppView } from './features/ui/uiSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import Landing from './Landing';
import Survey from './Survey';


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

    const { endGame} = props.config
    const contentType = ContentType.NonLiterateSes
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
        dispatch(loadConfig({
            config: props.config,
            contentId: props.contentId,
        }));
        dispatch(loadQuestions({
          questions: props.config.questions,
          contentId: props.contentId
        }));
        dispatch(loadProgressConfig({
          currentIndex: contentType,
          nextContent: endGame.nextContent,
          promptType: getPromptType(contentType, endGame.nextContent),
          nextSurvey: getNextSurveyIndex(contentType, endGame.nextContent)
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
