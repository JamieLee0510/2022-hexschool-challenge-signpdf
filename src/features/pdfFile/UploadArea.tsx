import Button from '@base/app/components/Button'
import { disableDropSideEffect } from '@base/utils/helper'
import { bgColor, primaryColor } from '@base/utils/styles'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

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

const InputLabel = styled.label`
background-color: green;
width: 70%;
height: 70px;
border: solid white;
border-radius: 30px;
font-size:'1.5rem;
color: white;
`

export default function UploadArea() {
    const uploadRef = useRef<HTMLDivElement>(null)

    function onFileChange(event: React.ChangeEvent) {
        const target = event.target as HTMLInputElement

        fileHandler(target.files![0])
    }

    const consoleDemo = (event: DragEvent) => {
        disableDropSideEffect(event)
        const dt = event.dataTransfer
        fileHandler(dt!.files[0])
        // const file = dt!.files[0]
        // console.log(file)
        // console.log(file!.name)
    }

    const fileHandler = (file: File) => {
        if (file.size > 10000000) {
            alert(`the size of file ${file.name} is over 10MB, please use other one`)
        } else {
            //  setFile(file)
        }
    }

    useEffect(() => {
        uploadRef.current!.addEventListener('dragenter', disableDropSideEffect, false)
        uploadRef.current!.addEventListener('dragover', disableDropSideEffect, false)
        uploadRef.current!.addEventListener('drop', consoleDemo, false)
        return () => {
            uploadRef.current!.removeEventListener('dragenter', disableDropSideEffect)
            uploadRef.current!.removeEventListener('dragover', disableDropSideEffect)
            uploadRef.current!.removeEventListener('drop', consoleDemo)
        }
    }, [])

    return (
        <Container ref={uploadRef}>
            <div>或拖曳檔案到此處</div>
            <label htmlFor='upload-file' className='upload-btn'>
                簽署新文件
                <input
                    id='upload-file'
                    type='file'
                    style={{ display: 'none' }}
                    onChange={onFileChange}
                />
            </label>
            <div>(限10MB內的PDF或JPG檔)</div>
        </Container>
    )
}
