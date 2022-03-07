import { createSlice } from '@reduxjs/toolkit'

interface UIState {
    appView: string,
    hideQuestionText: boolean,
}

const initialState: UIState = {
    appView: 'landing',
    hideQuestionText:false,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setAppView(state: UIState, action?: any) {
            return {
                ...state,
                appView: action.payload,
            }
        }
    }
});

export const { setAppView } = uiSlice.actions

export const selectAppView = (state: any) => state.ui.appView

export default uiSlice.reducer