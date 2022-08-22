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
    selectFeedback,
    selectAutoProgression,
    selectUiText,
    selectOptionStyle,
    selectDebugMode,
    selectIdentifiers
} from './features/config/configSlice';
import { setAppView } from './features/ui/uiSlice';
import {
    // Actions
    setPromptStatus,
    loadNextTask,
    // Selectors
    selectActiveTask,
    selectSurveyState,
    selectSurveyIsCompleted,
} from './features/survey/surveySlice';
import { ContentType, PromptType, ITask, ITarget } from './features/models';
import {
    AudioPlayer,
    Button,
    Lemur,
    TextDisplay,
    ImageOption,
    Option,
    Pirate,
    Chest,
    Star,
} from './components/';
import {
    Answers,
    CharacterWrapper as ChestWrapper,
    CheckAnswer,
    ContentWrapper,
    Debug,
    FeedbackWrapper,
    Instructions,
    ChestWrapper,
    StarsWrapper,
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
    const feedback = useAppSelector(selectFeedback);
    const uiText = useAppSelector(selectUiText);
    const promptComplete = useAppSelector(state => state.survey.promptComplete);
    const promptType = useAppSelector(state => state.playerProgress.promptType);
    const identifiers = useAppSelector(selectIdentifiers);

    const [shouldLoadNextTask, setShouldLoadNextTask] = useState(false);
    const[taskAnswered, setTaskAnswered] = useState(false);
    const [selectedOptionIndex, setSelectedOption] = useState(null);
    const [animate, setAnimate] = useState(false);
    const [taskStartTime, setTaskStartTime] = useState(0);

    const starsWrapperRef = useRef(null);

    const starCollectingAudio = useRef('https://literacytracker.org/wp-content/uploads/2022/08/ftm_collecting_audio.mp3');

    const [awardStars, updateStars] = useState([ false, false, false, false, false,
        false, false, false, false, false,
        false, false, false, false, false, ]);

    console.log(feedback.feedbackAudio);
    const feedbackAudioPath = H5P.getPath(
      feedback.feedbackAudio? feedback.feedbackAudio[0].path : "",
      surveyConfig.contentId
    );

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
      resizeH5P();
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
              setTaskAnswered(false);
            }, 2)
          setShouldLoadNextTask(false);
        }
    }, [shouldLoadNextTask])

   const handleNext = useCallback(() => {
      if (!surveyIsCompleted ) {
          setShouldLoadNextTask(true);
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
          userId: identifiers.userId,
          organizaiton: identifiers.organization,
          agentName: identifiers.agentName,
          registration: identifiers.registration,
          selectedOptionIndex,
          survey: surveyConfig.surveyId,
          duration: taskEndTime - taskStartTime
        });
        activateRandomStarOnAnswer();
        setAnimate(true);
        resizeH5P();
    }

    const handleAnswer = (option: number) => {
      setTaskAnswered(true);
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
        return (
          <Option
            key={`option-${index}]}}`}
            data={item}
            onClick={() => handleAnswer(index)}
            selected={index === selectedOptionIndex}
            disabled={selectedOptionIndex !== null && taskAnswered}
        />
      )
     })
    }

    const activateRandomStarOnAnswer = () => {
        let falseIndices = [];

        let stars = awardStars.map((x) => x);

        for (let i = 0; i < stars.length; i++) {
            if (!awardStars[i]) {
                const index = i;
                falseIndices.push(index);
            }
        }

        const randomFalseIndex = Math.floor(Math.random() * falseIndices.length);

        const starIndex = falseIndices[randomFalseIndex];

        stars[starIndex] = true;

        updateStars(stars);
        
        if (starCollectingAudio.current) {
            starCollectingAudio.current.play();
        }
    }

    const renderStar = (id: number) => {
        const hiddenStyle = {
            visibility: 'hidden',
            transition: 'visibility 0s, opacity 0.5s linear',
            opacity: '0',
        } as React.CSSProperties;
        const shownStyle = {
            visibility: 'visible',
            transition: 'visibility 0s, opacity 0.5s linear',
            opacity: '1',
        } as React.CSSProperties;

        if (awardStars[id]) {
            return <Star elementStyle={shownStyle} />
        } else {
            return <Star elementStyle={hiddenStyle} />
        }
    }

    return (
        <Wrapper>
            <ContentWrapper>
                <StarsWrapper ref={starsWrapperRef}>
                    {awardStars.map((star: boolean, index: number) => {
                        return (renderStar(index));
                    })}
                </StarsWrapper>
                <Instructions>
                    { !showDebug && <ChestWrapper>
                        {/* <Character
                            animate={animate}
                            feedbackAudio={feedbackAudioPath}
                            onAnimationEnd={onAnimationEnd}
                            successfulAnimation={feedback.feedbackAnimation}
                        /> */}
                        <Chest
                            animate={animate}
                            success={true}
                            successfulAudio={feedbackAudioPath}
                            onAnimationEnd={onAnimationEnd}
                            successfulAnimation={'chest-opened'}
                        />
                    { activeTask && !taskAnswered && activeTask.audioFile
                        && !surveyIsCompleted &&
                        <AudioPlayer
                          audio = {activeTask.audioFile}
                          autoplay = {false}
                        />
                    }
                    </ChestWrapper> }

                    { activeTask && activeTask.text &&
                      !surveyIsCompleted && !taskAnswered &&
                      <TextDisplay text={activeTask.text}/>
                    }

                </Instructions>
                  { (promptType === PromptType.Visual || promptComplete)
                  && activeTask && activeTask.items &&
                  !taskAnswered && !surveyIsCompleted &&
                  <>
                    <Answers length={
                      activeTask.items.length
                    } hasAnswer={
                      selectedOptionIndex
                    } optionStyle={
                      optionStyle
                    } mixedCaseFriendly={
                      surveyConfig.mixedCaseFriendlyFont
                    }>
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
                    <div dangerouslySetInnerHTML={
                      generateMarkup(feedback.feedbackText)
                    } />
                    {(!autoProgression) ?
                      <Button success onClick={handleNext}>
                        {uiText.continueButtonText}
                      </Button>: null
                    }
                </FeedbackWrapper> : null
            }
            <SurveyNav>
            </SurveyNav>
            {<audio ref={starCollectingAudio} controls style={{ display: 'none' }} src={'https://literacytracker.org/wp-content/uploads/2022/08/ftm_collecting_audio.mp3'}></audio>}
        </Wrapper>
    )
}

export default Survey;
