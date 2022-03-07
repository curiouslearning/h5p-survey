import { configureStore } from '@reduxjs/toolkit'

import surveyReducer from './features/survey/surveySlice'
import configReducer from './features/config/configSlice'
import uiReducer from './features/ui/uiSlice'
import playerProgressReducer from './features/playerProgress/playerProgressSlice';

const store = configureStore({
    reducer: {
        survey: surveyReducer,
        config: configReducer,
        ui: uiReducer,
        playerProgress: playerProgressReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
