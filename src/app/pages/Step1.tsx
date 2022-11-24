import { scaleAndPositionImage } from '@base/features/pdfFile/hooks/useRenderPdf'
import SignModal from '@base/features/signData/components/SignModal'
import customFabricDeleteIcon, { getMousePos, getTouchPos } from '@base/utils/helper'
import { FuncBarOptions, Step } from '@base/utils/types'
import ReactModal from '@components/BasicModal'
import PreviewArea from '@features/pdfFile/PreviewArea'
import { fabric } from 'fabric'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import BasicLayout from '../components/layouts/BasicLayout'
import FunctionBar from '../components/layouts/FunctionBar'
import StepLayout from '../components/layouts/StepLayout'
import ProgressLine from '../components/ProgressLine'
import ConvasContext from '../contexts/CanvasContext'
import { useAppSelector } from '../hooks'

export default function Step1() {
    const [mainCanvas, setMainCanvas] = useState<fabric.Canvas | null>(null)
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
    }, [step])

    const handleCloseModal = () => {
        setShowModal(false)
    }
    const scaleSize = useAppSelector((state) => ({
        height: state.pdf.value.size.height * state.pdf.scale,
        width: state.pdf.value.size.width * state.pdf.scale,
    }))

    const demoSign = useAppSelector((state) => state.sign.value[0])
    const addSignature = (imgData: string) => {
        fabric.Image.fromURL(imgData, (img) => {
            img.scaleToWidth(100)
            img.scaleToHeight(100)
            fabricCanvas.current!.add(img).renderAll()
        })
    }

    const renderBackground = (pdfData: string) => {
        fabric.Image.fromURL(pdfData, (img) => {
            scaleAndPositionImage(fabricCanvas.current!, img, scaleSize)
        })
    }

    // init render state
    const initRender = useRef(true)
    // variables between re-render
    const fabricCanvas = useRef<fabric.Canvas | null>(null)
    useEffect(() => {
        if (initRender.current) {
            fabricCanvas.current = new fabric.Canvas('file-canvas')
            customFabricDeleteIcon()
            console.log('fabricCanvas.current:', fabricCanvas.current)
        }

        return () => {
            initRender.current = false
        }
    }, [])

    return (
        <BasicLayout>
            <ConvasContext.Provider value={fabricCanvas.current}>
                {step !== Step.three && <FunctionBar step={step} funcBarOptions={stepFuncBar} />}
                <button
                    type='button'
                    onClick={() => {
                        addSignature(demoSign)
                    }}
                >
                    test
                </button>
                <ProgressLine step={step} />
                <PreviewArea renderCallback={renderBackground}>
                    <canvas id='file-canvas' />
                </PreviewArea>

                <SignModal
                    isOpen={showModal}
                    closeModal={handleCloseModal}
                    mainCanvas={mainCanvas}
                    setMainCanvas={setMainCanvas}
                    addSignOnCanvas={addSignature}
                >
                    <div style={{ width: '100%', textAlign: 'center' }}>Modal text!</div>
                </SignModal>
            </ConvasContext.Provider>
        </BasicLayout>
    )
}
