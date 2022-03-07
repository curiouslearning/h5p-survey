import {
    createAction,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit'

import { ISurveyState, IRootState } from '../models';

const initialState: ISurveyState = {
    activeTask: null,
    activeTaskIndex: -1,
    promptComplete: false,
    surveyActive: false,
    surveyIsCompleted: false,
    taskAnswered: false,
    shouldLoadNextTask: false,
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
        initSurvey(state: ISurveyState, action: {payload: any}) {

        },
        loadNextTask(state: ISurveyState):void {
            state.shouldLoadNextTask = true;
            // state.activeTaskIndex = state.activeTaskIndex + 1;
        },

        setSurveyCompleted(state: ISurveyState):void {
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

export const selectShouldLoadNextTask = (state: IRootState) => state.survey.shouldLoadNextTask

export default surveySlice.reducer
