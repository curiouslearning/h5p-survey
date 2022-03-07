import React, {
    useCallback,
    useEffect,
    useState,
} from 'react';

declare var H5P: any;
import EventService from './features/xAPI/eventService';
import { useAppDispatch, useAppSelector } from './hooks';
import {
    selectSurveyConfig,
    selectAutoProgression,
    selectUiText,
    selectOptionStyle,
    selectDebugMode,
} from './features/config/configSlice';
import { setAppView } from './features/ui/uiSlice';
import {
    // Actions
    setPromptStatus,
    loadNextTask,
    // Selectors
    selectActiveTask,
    selectSurveyState,
    selectShouldLoadNextTask,
    selectSurveyIsCompleted,
} from './features/survey/surveySlice';
import { SurveyType, PromptType, ITask, ITarget } from './features/models';
import {
    AudioPlayer,
    Button,
    Lemur,
    TextDisplay,
    ImageOption,
    Option,
    Pirate,
} from './components/';
import {
    Answers,
    CharacterWrapper,
    CheckAnswer,
    ContentWrapper,
    Debug,
    FeedbackWrapper,
    Instructions,
    Question,
    SurveyNav,
    Wrapper,
} from './components/Survey/styled';

let nextStepTimeout: any = null;
let createTaskTimeout: any = null;

const generateMarkup = (htmlString: string) => ({ __html: htmlString })

const Survey = (props: any) => {
    const dispatch = useAppDispatch();
    const activeTask = useAppSelector(selectActiveTask);
    const surveyIsCompleted = useAppSelector(selectSurveyIsCompleted);
    const showDebug = useAppSelector(selectDebugMode);
    const optionStyle = useAppSelector(selectOptionStyle);
    const autoProgression = useAppSelector(selectAutoProgression);
    const surveyState = useAppSelector(selectSurveyState);
    const surveyConfig = useAppSelector(selectSurveyConfig);
    const uiText = useAppSelector(selectUiText);
    const shouldLoadNextTask = useAppSelector(selectShouldLoadNextTask)
    const promptComplete = useAppSelector(state => state.survey.promptComplete);
    const userId = useAppSelector(state => state.config.userId);
    const organization = useAppSelector(state => state.config.organization);
    const promptType = useAppSelector(state => state.playerProgress.promptType);

    const[taskAnswered, setTaskAnswered] = useState(false);
    const [selectedOptionIndex, setSelectedOption] = useState(null);
    const [animate, setAnimate] = useState(false);
    const [taskStartTime, setTaskStartTime] = useState(0);

    const eService = new EventService();

   // Hooks goes here
    useEffect(() => {
        setSelectedOption(null);
        setTimeout(() => resizeH5P, 10);
        setAnimate(false);
    }, [activeTask])

    useEffect(() => {
        if (surveyIsCompleted) {
            console.log('completed');
            dispatch(setAppView('endscreen'))
        }
    }, [surveyIsCompleted])

    useEffect(() => {
      setTaskStartTime(Date.now());
    }, [promptComplete]);

    useEffect(() => {
        if (selectedOptionIndex !== null) {
            if (autoProgression.enabled) {
                checkAnswer()
            }
        }
    }, [autoProgression.enabled, selectedOptionIndex])

    useEffect(() => {
        if (shouldLoadNextTask) {
            setTimeout(() => {
              dispatch(loadNextTask())
              dispatch(setPromptStatus(false));
            }, 2)
        }
    }, [shouldLoadNextTask])

   const handleNext = useCallback(() => {
      if (!surveyIsCompleted ) {
          dispatch(loadNextTask())
      }
    }, [surveyIsCompleted, surveyState])

    const resizeH5P = () => {
        const iframe = window.frameElement;
        var doc = iframe.ownerDocument;
        // @ts-ignore
        var win = doc.defaultView || doc.parentWindow;
        win.dispatchEvent(new Event('resize'))
    }


    // USED IN DEV
    if (!activeTask) {
        return (<div>Loading...</div>)
    }

    const checkAnswer = () => {
        const taskEndTime = Date.now();
        let score = 0;
        eService.logEvent('answered', {
          ...activeTask,
          userId,
          organization,
          selectedOptionIndex,
          survey: surveyConfig.surveyId,
          duration: taskEndTime - taskStartTime
        });
        setAnimate(true);
        resizeH5P();
    }


    const handleAnswer = (option: number) => {
      setSelectedOption(option);
      eService.logEvent('interacted', activeTask);
    }
    const onAnimationEnd = () => {
        setAnimate(false);

        if (autoProgression.enabled) {
            clearTimeout(nextStepTimeout);
            nextStepTimeout = setTimeout(handleNext, autoProgression.delayTime);
        }
    }

    const Character = (props: any) => {
      return <Pirate {...props} />
    }

    const mapAnswers =  (items: Array<ITarget>)  => {
      return items.map((item: ITarget, index: number) => {
        if(item.image) {
          return (
            <ImageOption
                key={`option-${index}]}}`}
                data={item}
                onClick={() => handleAnswer(index)}
                selected={index === selectedOptionIndex}
                disabled={selectedOptionIndex !== null && taskAnswered}
            />
          );
        }
        return (<Option
            key={`option-${index}]}}`}
            data={item}
            onClick={() => handleAnswer(index)}
            selected={index === selectedOptionIndex}
            disabled={selectedOptionIndex !== null && taskAnswered}
        />)
     })
    }

    return (
        <Wrapper>
            <ContentWrapper>
                <Instructions>
                    { !showDebug && <CharacterWrapper>
                        <Character
                            animate={animate}
                            feedbackAudio={surveyConfig.feedbackAudioPath}
                            onAnimationEnd={onAnimationEnd}
                            successfulAnimation={surveyConfig.feedbackAnimation}
                        />
                    { activeTask && activeTask.audioFile
                        && !surveyIsCompleted &&
                        <AudioPlayer audio={activeTask.audioFile} autoplay={false} />}
                    </CharacterWrapper> }

                    { activeTask && activeTask.text &&
                      !surveyIsCompleted &&
                      <TextDisplay text={activeTask.text}/>
                    }

                </Instructions>
                  { (promptType === PromptType.Visual || promptComplete)
                  && activeTask && activeTask.items && !surveyIsCompleted &&
                  <>
                    <Answers length={activeTask.items.length} hasAnswer={selectedOptionIndex} optionStyle={optionStyle} mixedCaseFriendly={surveyConfig.mixedCaseFriendlyFont}>
                        { mapAnswers(activeTask.items) }
                    </Answers>
                </> }
            </ContentWrapper>
            { !taskAnswered && !autoProgression.enabled && <CheckAnswer>
                <Button
                    primary
                    onClick={checkAnswer}
                >{uiText.checkAnswerText} </Button>
            </CheckAnswer> }
            { taskAnswered ?
                <FeedbackWrapper success>
                    <div dangerouslySetInnerHTML={generateMarkup(uiText.feedbackText)} />
                    {(!autoProgression) ?
                      <Button success onClick={handleNext}>{uiText.continueButtonText}</Button>: null
                    }
                </FeedbackWrapper> : null
            }
            <SurveyNav>
            </SurveyNav>
        </Wrapper>
    )
}

export default Survey;