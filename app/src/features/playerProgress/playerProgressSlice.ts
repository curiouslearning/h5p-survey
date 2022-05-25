
import { createSlice } from '@reduxjs/toolkit'
import { IContentDef } from './utils';
import {
  IRootState,
  ISurvey,
  ISurveyPreReqs,
  ContentType,
  PromptType
} from '../models'

interface ISurveyState {
  currentIndex: ContentType;
  nextSurvey: ContentType;
  nextContent: IContentDef[];
  promptType: PromptType;
}

const initialState: ISurveyState = {
  currentIndex: ContentType.None,
  nextSurvey: ContentType.None,
  nextContent: [],
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
      state.nextContent = action.payload.nextContent;
      state.promptType = action.payload.promptType;
    }
  }
});

export const {
  loadProgressConfig,
} = playerProgressSlice.actions;

export default playerProgressSlice.reducer;
