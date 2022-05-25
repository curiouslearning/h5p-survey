import { createSlice } from '@reduxjs/toolkit'
import { IRootState } from '../models'

interface ConfigState {
    surveyId: string;
    contentId: string;
    userId: string;
    organization: string;
    agentName: string;
    passPercentage?: number;
    uiText: {
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
    feedback: {
      feedbackText: string;
      feedbackAnimation: string;
      feedbackAudio: any;
    }
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
    agentName: "anonymous",
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
    feedback: {
      feedbackText: '',
      feedbackAnimation: '',
      feedbackAudio: [],
    },
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
          agentName: string;
          registration: string;
        }
      }) {
        console.log(`uuid: ${action.payload}`);
        return {
          ...state,
          userId: action.payload.userId,
          organization: action.payload.organization,
          agentName: action.payload.agentName,
          registration: action.payload.registration
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
export const selectFeedback = ( state: IRootState ) => state.config.feedback;
export const selectIdentifiers = ( state: IRootState ) => {
  const {userId, organization, agentName, registration} = state.config;
  return {
    userId,
    organization,
    agentName,
    registration
  };
}
export const selectSurveyConfig = (state: IRootState) => {
    const { surveyId, feedback, autoProgression, uiText, contentId, userId, mixedCaseFriendlyFont, testAllInBasalCeiling } = state.config;
    return {
        surveyId,
        uiText,
        feedback,
        autoProgression,
        contentId,
        userId,
        mixedCaseFriendlyFont,
    }
}

export default configSlice.reducer
