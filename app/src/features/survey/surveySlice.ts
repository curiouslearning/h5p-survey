import {
    createAction,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit'

import { ISurveyState, IRootState } from '../models';

const initialState: ISurveyState = {
    taskList: [],
    activeTask: null,
    activeTaskIndex: -1,
    promptComplete: false,
    surveyActive: false,
    surveyIsCompleted: false,
    taskAnswered: false,
    startTime: Date.now(),
    endTime: 0,
    duration: 0,
    userId: '',
}

const surveySlice = createSlice({
    name: 'survey',
    initialState,
    reducers: {
        setPromptStatus(state: ISurveyState, action: {payload: boolean}) {
          state.promptComplete = action.payload;
        },
        loadQuestions(
          state: ISurveyState,
          action: {
            payload: {
              questions: any,
              contentId: string
            }
          }) {
          const contentId = action.payload.contentId;
          state.taskList = action.payload.questions.map((question: any) => {
            const promptAudio= question.audioFile? question.audioFile[0].path : '';
            return {
              items: question.items.map((choice: any) => {
                const imagePath = choice.image? choice.image.path : null;
                return {
                  text: choice.text,
                  image: imagePath ? H5P.getPath(imagePath, contentId) : null
                }
              }),
              text: question.prompt,
              audioFile: H5P.getPath(promptAudio, contentId)
            };
          })
        },
        initSurvey(state: ISurveyState, action: {payload: any}) {
          return {
            ...state,
            ...action.payload
          }
        },

        loadNextTask(state: ISurveyState):void {
            state.activeTaskIndex++;
            if (state.activeTaskIndex < state.taskList.length) {
              state.activeTask = state.taskList[state.activeTaskIndex];
            } else {
              state.surveyIsCompleted = true;
            }
        },

        setSurveyCompleted(state: ISurveyState):void {
          state.surveyIsCompleted = true;
          state.endTime = Date.now();
        },

        setDuration(state: ISurveyState):void {
          state.duration = state.endTime - state.startTime;
        },

        resetSurvey(state: ISurveyState) {

            return {
                ...state,
                activeTaskIndex: -1,
                surveyActive: false,
                surveyIsCompleted: false,
                startTime: Date.now(),
                endTime: 0,
                duration: 0,
            }
        },
    }
})

export const {
    setPromptStatus,
    loadQuestions,
    initSurvey,
    loadNextTask,
    resetSurvey,
    setSurveyCompleted,
    setDuration,
} = surveySlice.actions

// Return overview of the survey state
export const selectSurveyState = (state: IRootState) => {
    const { survey } = state;
    const {
        surveyActive,
        startTime,
        endTime,
        duration,
    } = survey;

    return {
        surveyActive,
        startTime,
        endTime,
        duration,
    }
}

// Selector for checking if test is completed
export const selectSurveyIsCompleted = (state: IRootState) => state.survey.surveyIsCompleted;
export const selectActiveTask = (state: IRootState) => state.survey.activeTask;
export const selectTestDuration = (state: IRootState) => state.survey.duration;
export const selectTestStartTime = (state: IRootState) => state.survey.startTime;
export const selectTestEndTime = (state: IRootState) => state.survey.endTime;
// Selector for retreiving the score and max score for the survey


export default surveySlice.reducer
