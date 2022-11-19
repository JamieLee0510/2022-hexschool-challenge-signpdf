import { useAppDispatch, useAppSelector } from '@base/app/hooks'
import { disableDropSideEffect, isProperFile } from '@base/utils/helper'
import { bgColor, primaryColor } from '@base/utils/styles'
import { PdfData, UploadFile } from '@base/utils/types'
import Button from '@components/Button'
import Loading from '@features/loading/Loading'
import { setLoading } from '@features/loading/loadingSlice'
import React, { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'

import useCanvasSize from './hooks/useCanvasSize'
import uploadFile from './hooks/useUploadFile'
import { setPdfData } from './pdfSlice'

const svgBg = bgColor.replace('#', '%23')

const Container = styled.div`
    width: 230px;
    height: 200px;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='${svgBg}' rx='22' ry='22' stroke='%23333' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='26' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 22px;
    position: absolute;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 20%;
    left: 50%;
    transform: translate(-50%);
`

export default function UploadArea() {
    const uploadRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoading = useAppSelector((state) => state.loading.value.isLoading)

    const uploadCallback = useCallback(
        () => (data: PdfData) => {
            dispatch(setPdfData(data))
            dispatch(setLoading(false))
            navigate('/step1')
        },
        [dispatch, navigate],
    )

    const fileHandler = useCallback(
        (file: File) => {
            dispatch(setLoading(true))

            if (!isProperFile(file.type)) {
                alert(`the file type is ${file.type}, please upload a pdf or png/jpg file`)
                return
            }

            if (file.size > 10000000) {
                alert(`the size of file ${file.name} is over 10MB, please use other one`)
                return
            }
            uploadFile(file, uploadCallback)
        },
        [dispatch, uploadCallback],
    )

    function onFileChange(event: React.ChangeEvent) {
        const target = event.target as HTMLInputElement
        fileHandler(target.files![0])
    }

    const consoleDemo = useCallback(
        (event: DragEvent) => {
            disableDropSideEffect(event)
            const dt = event.dataTransfer
            fileHandler(dt!.files[0])
        },
        [fileHandler],
    )

    useEffect(() => {
        const uploadDom = uploadRef.current
        if (uploadDom !== null) {
            uploadDom.addEventListener('dragenter', disableDropSideEffect, false)
            uploadDom.addEventListener('dragover', disableDropSideEffect, false)
            uploadDom.addEventListener('drop', consoleDemo, false)
        }

        return () => {
            if (uploadDom !== null) {
                uploadDom.removeEventListener('dragenter', disableDropSideEffect)
                uploadDom.removeEventListener('dragover', disableDropSideEffect)
                uploadDom.removeEventListener('drop', consoleDemo)
            }
        }
    }, [consoleDemo, uploadRef])

    return (
        <Container ref={uploadRef}>
            {!isLoading && (
                <>
                    <div>或拖曳檔案到此處</div>
                    <label htmlFor='upload-file' className='upload-btn'>
                        <input
                            id='upload-file'
                            type='file'
                            style={{ display: 'none' }}
                            onChange={onFileChange}
                        />
                        簽署新文件
                    </label>
                    <div>(限10MB內的PDF或JPG檔)</div>
                </>
            )}
            {isLoading && <Loading loadingText='上傳中' size={100} />}
            <div id='canvas-div' style={{ display: 'none' }} />
        </Container>
    )
}
