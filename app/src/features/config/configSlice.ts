import { createSlice } from '@reduxjs/toolkit'
import { IRootState, SurveyType } from '../models'

interface ConfigState {
    surveyId: string;
    contentId: string;
    userId: string;
    organization: string;
    passPercentage?: number;
    uiText: {
      feedbackText: string;
      resultText: string;
      solutionButtonText: string;
      retryButtonText: string;
      closeButtonText: string;
      playButtonText: string;
      continueButtonText: string;
      checkAnswerText: string;
    };
    isWebview: boolean;
    autoProgression: {
      enabled: boolean;
      delayTime: number;
    };
    feedbackAnimation: string;
    feedbackAudioPath: string;
    endGame?: {
        successFeedback: any;
        failFeedback: any;
        showRetryButton: boolean;
        showSolutionButton: boolean;
        showCloseButton: boolean;
    };
    ipToken: string;
    debugMode?: boolean;
    testAllInBasalCeiling: boolean;
}

const initialState:ConfigState = {
    surveyId: '',
    contentId: '',
    userId: 'anonymous',
    organization: 'curiouslearning',
    uiText: {
      feedbackText: '',
      resultText: '',
      solutionButtonText: '',
      retryButtonText: '',
      closeButtonText: '',
      playButtonText: '',
      continueButtonText: '',
      checkAnswerText: ''
    },
    feedbackAnimation: '',
    feedbackAudioPath: '',
    isWebview: false,
    autoProgression: {
        enabled: false,
        delayTime: 0,
    },
    ipToken: '',
    testAllInBasalCeiling: false,
}

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        loadConfig(state: ConfigState, action: {
            payload: {
                config: any;
                contentId: string;
            }
        }) {
            // console.log(action.payload.config);
            return {
                ...state,
                contentId: action.payload.contentId,
                ...action.payload.config,
            }
        },
      setUser(state: ConfigState, action: {
        payload: {
          userId: string;
          organization: string;
        }
      }) {
        console.log(`uuid: ${action.payload}`);
        return {
          ...state,
          userId: action.payload.userId,
          organization: action.payload.organization
        }
      },
      setIsWebview(state: ConfigState, action: {
        payload: boolean
      }) {
          state.isWebview= action.payload
        }
}});

export const {
    loadConfig,
    setUser,
    setIsWebview
} = configSlice.actions;

export const selectContentId = (state: IRootState) => state.config.contentId;
export const selectAutoScore = (state: IRootState) => state.config.autoScore;
export const selectAutoProgression = (state: IRootState) => state.config.autoProgression;
export const selectDebugMode = (state: IRootState) => state.config.debugMode;
export const selectOptionStyle = (state: IRootState) => state.config.optionStyle;
export const selectUiText = (state: IRootState) => state.config.uiText;
export const selectIsWebView = ( state: IRootState ) => state.config.isWebview;
export const selectUserId = ( state: IRootState ) => state.config.userId;
export const selectSurveyConfig = (state: IRootState) => {
    const { surveyId, feedbackAudioPath, feedbackAnimation, autoProgression, uiText, contentId, userId, mixedCaseFriendlyFont, testAllInBasalCeiling } = state.config;
    return {
        surveyId,
        uiText,
        feedbackAnimation,
        feedbackAudioPath,
        autoProgression,
        contentId,
        userId,
        mixedCaseFriendlyFont,
    }
}

export default configSlice.reducer