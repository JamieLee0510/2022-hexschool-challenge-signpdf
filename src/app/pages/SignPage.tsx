import SignModal from '@base/features/signData/components/SignModal'
import customFabricDeleteIcon from '@base/utils/helper'
import { FuncBarOptions, Step } from '@base/utils/types'
import PreviewArea from '@features/pdfFile/PreviewArea'
import { fabric } from 'fabric'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import BasicLayout from '../components/layouts/BasicLayout'
import FunctionBar from '../components/layouts/FunctionBar'
import ProgressLine from '../components/ProgressLine'
import ConvasContext from '../contexts/CanvasContext'
import { useAppSelector } from '../hooks'

export default function SignPage() {
    const step1FuncBar = {
        pen: () => {
            alert(`請先確認是否使用${fileName}文件進行操作`)
        },
        text: () => {
            alert(`請先確認是否使用${fileName}文件進行操作`)
        },
        date: () => {
            alert(`請先確認是否使用${fileName}文件進行操作`)
        },
        checked: () => {
            alert(`請先確認是否使用${fileName}文件進行操作`)
        },
        btn1: {
            text: '取消',
            func: () => {
                navigate(-1)
            },
        },
        btn2: {
            text: '確認',
            func: () => {
                setStep(Step.two)
            },
        },
    }
    const step2FuncBar = {
        pen: () => {
            setShowModal(true)
        },
        text: () => {
            alert(`請先確認是否使用${fileName}文件進行操作`)
        },
        date: () => {
            alert(`請先確認是否使用${fileName}文件進行操作`)
        },
        checked: () => {
            alert(`請先確認是否使用${fileName}文件進行操作`)
        },
        btn1: {
            text: '取消',
            func: () => {
                navigate(-1)
            },
        },
        btn2: {
            text: '下一步',
            func: () => {
                setStep(Step.two)
            },
        },
    }
    const navigate = useNavigate()
    const [step, setStep] = useState<Step>(Step.one)
    const [stepFuncBar, setStepFuncBar] = useState<FuncBarOptions>(step1FuncBar)
    const fileName = useAppSelector((state) => state.pdf.value.name)

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (step === Step.two) {
            setStepFuncBar(step2FuncBar)
        } else {
            setStepFuncBar(step1FuncBar)
        }
    }, [step, step1FuncBar, step2FuncBar])

    // init render state
    const initRender = useRef(true)
    // variables between re-render
    const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null)
    useEffect(() => {
        if (initRender.current) {
            setFabricCanvas(new fabric.Canvas('file-canvas'))
            customFabricDeleteIcon()
        }
        return () => {
            initRender.current = false
        }
    }, [])

    return (
        <BasicLayout>
            <ConvasContext.Provider value={fabricCanvas}>
                {step !== Step.three && <FunctionBar step={step} funcBarOptions={stepFuncBar} />}
                <ProgressLine step={step} />
                <PreviewArea>
                    <canvas id='file-canvas' />
                </PreviewArea>

                <SignModal
                    isOpen={showModal}
                    closeModal={() => {
                        setShowModal(false)
                    }}
                >
                    <div style={{ width: '100%', textAlign: 'center' }}>Modal text!</div>
                </SignModal>
            </ConvasContext.Provider>
        </BasicLayout>
    )
}
