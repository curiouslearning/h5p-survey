
import { createSlice } from '@reduxjs/toolkit'
import {
  IRootState,
  ISurvey,
  ISurveyPreReqs,
  SurveyType,
  PromptType
} from '../models'

interface ISurveyState {
  currentIndex: SurveyType;
  nextSurvey: SurveyType;
  promptType: PromptType;
}

const initialState: ISurveyState = {
  currentIndex: SurveyType.None,
  nextSurvey: SurveyType.None,
  promptType: PromptType.Audio
}

const playerProgressSlice = createSlice({
  name: 'playerProgress',
  initialState,
  reducers: {
    loadProgressConfig(state: ISurveyState, action:{
      payload: ISurveyState
    }){
      state.currentIndex = action.payload.currentIndex;
      state.nextSurvey = action.payload.nextSurvey;
      state.promptType = action.payload.promptType;
    }
  }
});

export const {
  loadProgressConfig,
} = playerProgressSlice.actions;

export default playerProgressSlice.reducer;
