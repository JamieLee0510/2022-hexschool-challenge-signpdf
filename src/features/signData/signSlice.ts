import { useAppSelector } from '@base/app/hooks'
import { FormatSize, PdfData, UploadFile } from '@base/utils/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SignState = {
    value: Array<string>
}

const initialState: SignState = {
    value: [],
}

export const signSlice = createSlice({
    name: 'sign',
    initialState,
    reducers: {
        addSignData: (state, action: PayloadAction<string>) => {
            state.value.push(action.payload)
        },
        removeSignData: (state, action: PayloadAction<number>) => {
            state.value.splice(action.payload, 1)
        },
    },
})

export const { addSignData, removeSignData } = signSlice.actions

export default signSlice.reducer
