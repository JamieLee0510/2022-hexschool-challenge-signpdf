import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import counterReducer from '../../features/counter/counterSlice'

export const configureSelfStore = (selfInitState = {}) => {
    const store = configureStore({
        reducer: {
            counter: counterReducer,
        },
        preloadedState: selfInitState,
    })
    return store
}

export const store = configureSelfStore()

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
