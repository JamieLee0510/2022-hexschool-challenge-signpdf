import { getMousePos, getTouchPos } from '@base/utils/helper'
import { FuncBarOptions, Step } from '@base/utils/types'
import ReactModal from '@components/BasicModal'
import PreviewArea from '@features/pdfFile/PreviewArea'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import BasicLayout from '../components/layouts/BasicLayout'
import FunctionBar from '../components/layouts/FunctionBar'
import StepLayout from '../components/layouts/StepLayout'
import ProgressLine from '../components/ProgressLine'
import { useAppSelector } from '../hooks'

const canvasSize = 500

export default function Step1() {
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

    return (
        <BasicLayout>
            {step !== Step.three && <FunctionBar step={step} funcBarOptions={stepFuncBar} />}
            <ProgressLine step={step} />
            <PreviewArea />
            <button
                type='button'
                onClick={() => {
                    setShowModal(true)
                }}
            >
                test modal
            </button>
            <ReactModal
                isOpen={showModal}
                closeModal={handleCloseModal}
                handleCloseModal={handleCloseModal}
            >
                <div style={{ width: '100%', textAlign: 'center' }}>Modal text!</div>
            </ReactModal>
        </BasicLayout>
    )
}
