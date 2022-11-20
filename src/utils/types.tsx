import { PdfState } from '@features/pdfFile/pdfSlice'
import React, { ReactNode } from 'react'

export type PureChildrenProps = { children: ReactNode }

export enum Step {
    one = 1,
    two = 2,
    three = 3,
}

export type StepLayoutProps = PureChildrenProps & {
    step: Step
}

export enum UploadFile {
    IMAGE = 'image',
    PDF = 'pdf',
}

export type PdfData = {
    name: string
    size: FormatSize
    data: Array<string>
    fileType: UploadFile
}

export type UploadPdfFunc = () => (data: PdfData) => void

export type FormatSize = {
    width: number
    height: number
}

export type ModifyFunction = (args: unknown) => void
export type BtnProps = {
    text: string
    func: () => void
}

export type FuncBarOptions = {
    pen: ModifyFunction
    text: ModifyFunction
    date: ModifyFunction
    checked: ModifyFunction
    btn1: BtnProps
    btn2: BtnProps
}
