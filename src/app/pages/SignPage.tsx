import SignModal from '@base/features/signData/components/SignModal'
import { Step } from '@base/utils/types'
import BasicLayout from '@components/layouts/BasicLayout'
import FunctionBar from '@components/layouts/FunctionBar'
import ProgressLine from '@components/ProgressLine'
import PreviewArea from '@features/pdfFile/PreviewArea'
import React, { useState } from 'react'

import ConvasContext from '../contexts/CanvasContext'
import useFabricCanvas from '../hooks/useFabricCanvs'
import useStepFunc from '../hooks/useStepFunc'

export default function SignPage() {
    const fabricCanvas = useFabricCanvas()
    const [showModal, setShowModal] = useState(false)
    const { step, stepFuncBar } = useStepFunc(setShowModal)

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
