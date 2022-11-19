import { PdfState } from '@features/pdfFile/pdfSlice'
import React, { ReactElement, ReactNode } from 'react'

export type PureChildrenProps = { children: ReactNode }

export enum UploadFile {
    IMAGE = 'image',
    PDF = 'pdf',
}

export type PdfData = {
    size: FormatSize
    data: Array<string>
    fileType: UploadFile
}

export type UploadPdfFunc = () => (data: PdfData) => void

export type FormatSize = {
    width: number
    height: number
}
