import { useAppSelector } from '@base/app/hooks'
import { FuncBarOptions, Step } from '@base/utils/types'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useStepFunc = (setShowModalFunc: React.Dispatch<React.SetStateAction<boolean>>) => {
    const navigate = useNavigate()
    const [step, setStep] = useState<Step>(Step.one)
    const fileName = useAppSelector((state) => state.pdf.value.name)
    const step1FuncBar = useMemo(
        () => ({
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
        }),
        [fileName, navigate],
    )
    const step2FuncBar = useMemo(
        () => ({
            pen: () => {
                setShowModalFunc(true)
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
        }),
        [fileName, navigate, setShowModalFunc],
    )
    const [stepFuncBar, setStepFuncBar] = useState<FuncBarOptions>(step1FuncBar)
    useEffect(() => {
        if (step === Step.two) {
            setStepFuncBar(step2FuncBar)
        } else {
            setStepFuncBar(step1FuncBar)
        }
    }, [step, step1FuncBar, step2FuncBar])

    return { step, stepFuncBar }
}

export default useStepFunc
