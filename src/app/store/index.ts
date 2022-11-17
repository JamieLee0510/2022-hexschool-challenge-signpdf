import loadingReducer from '@features/loading/loadingSlice'
import pdfReducer from '@features/pdfFile/pdfSlice'
import { Action, configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit'

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false,
})

export const configureSelfStore = (selfInitState = {}) => {
    const store = configureStore({
        reducer: {
            pdf: pdfReducer,
            loading: loadingReducer,
        },
        preloadedState: selfInitState,
        // eslint-disable-next-line @typescript-eslint/no-shadow
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
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
