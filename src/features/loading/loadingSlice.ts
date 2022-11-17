import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface LoadingState {
    value: { isLoading: boolean }
}

const initialState: LoadingState = {
    value: {
        isLoading: false,
    },
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.value.isLoading = action.payload
        },
    },
})

export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer
