import React, { ReactElement, ReactNode } from 'react'

export type PureChildrenProps = { children: ReactNode }

export enum UploadFile {
    IMAGE = 'image',
    PDF = 'pdf',
}

export type UploadPdfFunc = () => (data: { type: UploadFile; data: string | Array<string> }) => void
