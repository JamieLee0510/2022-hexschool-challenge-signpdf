import { useAppSelector } from '@base/app/hooks'
import { FormatSize, PdfData, UploadFile } from '@base/utils/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PdfState = {
    value: PdfData
    scale: number
}

const initialState: PdfState = {
    value: { data: [], size: { width: 800, height: 530 }, fileType: UploadFile.PDF },
    scale: 1,
}

export const pdfSlice = createSlice({
    name: 'pdf',
    initialState,
    reducers: {
        setPdfData: (state, action: PayloadAction<PdfData>) => {
            state.value = action.payload
        },
        setDataSize: (state, action: PayloadAction<FormatSize>) => {
            state.value.size = action.payload
        },
        setScale: (state, action: PayloadAction<number>) => {
            state.scale = action.payload
        },
        emptyPdfData: (state) => {
            state.value = initialState.value
        },
        signPdfData: (state, action: PayloadAction<{ pageNum: number; data: string }>) => {
            const payload = action.payload as { pageNum: number; data: string }
            state.value.data[payload.pageNum - 1] = payload.data
        },
    },
})

export const { setPdfData, setDataSize, emptyPdfData, signPdfData, setScale } = pdfSlice.actions

export default pdfSlice.reducer
