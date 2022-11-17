import { UploadFile } from '@base/utils/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PdfState = {
    pdfData: Array<string>
    pdfFile: Uint8Array | null
    imageData?: string
    fileType: UploadFile
}

const initialState: PdfState = {
    pdfData: [],
    pdfFile: null,
    fileType: UploadFile.PDF,
}

export const pdfSlice = createSlice({
    name: 'pdf',
    initialState,
    reducers: {
        setPdfData: (
            state,
            action: PayloadAction<{ type: UploadFile; data: string | Array<string> }>,
        ) => {
            switch (action.payload.type) {
                case UploadFile.IMAGE:
                    if (state.pdfData.length !== 0) {
                        state.pdfData = []
                    }
                    state.imageData = action.payload.data as string
                    break
                case UploadFile.PDF:
                    if (state.imageData?.length !== 0) {
                        state.imageData = ''
                    }

                    state.pdfData = action.payload.data as Array<string>
                    console.log(action.payload.data)
                    break
                default:
                    state.imageData = ''
            }
        },
        setPdfFile: (state, action: PayloadAction<Uint8Array>) => {
            state.pdfFile = action.payload
        },

        emptyPdfData: (state) => {
            state.imageData = ''
            state.pdfData = []
        },
        signPdfData: (state, action: PayloadAction<{ pageNum?: number; data: string }>) => {
            if (state.fileType === UploadFile.IMAGE) {
                const payload = action.payload as { data: string }
                state.imageData = payload.data
            } else {
                const payload = action.payload as { pageNum: number; data: string }
                state.pdfData[payload.pageNum - 1] = payload.data
            }
        },
    },
})

export const { setPdfData, setPdfFile, emptyPdfData, signPdfData } = pdfSlice.actions

export default pdfSlice.reducer
