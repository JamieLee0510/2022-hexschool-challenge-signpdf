import CancelIcon from '@assets/cancel_icon.png'
import Button from '@base/app/components/Button'
import { useAppDispatch, useAppSelector } from '@base/app/hooks'
import { getMousePos, getTouchPos } from '@base/utils/helper'
import { MainCanvas, SetMainCanvas } from '@base/utils/types'
import { fabric } from 'fabric'
import React, { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'
import ReactModal from 'react-modal'

import { addSignData, removeSignData } from '../signSlice'

ReactModal.setAppElement('#root')
const canvasSize = 500
const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '20px',
        height: '50vh',
        width: '40%',
        display: 'flex',
        flexDirection: 'column' as const,
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
}
export default function SignModal({
    children,
    isOpen,
    closeModal,
    mainCanvas,
    setMainCanvas,
    addSignOnCanvas,
}: {
    children: ReactNode
    isOpen: boolean
    closeModal: () => void
    mainCanvas: MainCanvas
    setMainCanvas: SetMainCanvas
    addSignOnCanvas: (imgData: string) => void
}) {
    const cancelBtn = useRef<HTMLImageElement>(null)
    const dispatch = useAppDispatch()
    useEffect(() => {
        setTimeout(() => {
            cancelBtn.current!.addEventListener('click', closeModal)
        }, 0)

        return () => {
            setTimeout(() => {
                cancelBtn.current!.removeEventListener('click', closeModal)
            }, 0)
        }
    }, [closeModal, isOpen])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canvasRef = useRef<any>(null)

    const demoCanvasProps = {
        color: 'black',
        width: 500,
        height: 150,
        brushRadius: 5,
        lazyRadius: 8,
    }

    const saveSignature = () => {
        const signatureDataUrl = canvasRef.current!.getDataURL()
        dispatch(addSignData(signatureDataUrl))
        setSign(false)
    }

    const [signing, setSign] = useState(false)
    const signatureList = useAppSelector((state) => state.sign.value)

    useEffect(() => {
        if (signatureList.length === 0) {
            setSign(true)
        }
    }, [signatureList.length])

    return (
        <ReactModal
            isOpen={isOpen}
            contentLabel='modal'
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick
            style={modalStyles}
        >
            <div
                style={{
                    top: '1%',
                    right: '1%',
                    position: 'absolute',
                    width: '30px',
                    height: '30px',
                }}
            >
                <img
                    ref={cancelBtn}
                    src={CancelIcon}
                    alt='cancel'
                    style={{ height: '100%', width: '100%' }}
                />
            </div>

            {signing && (
                <>
                    <div style={{ marginTop: '40px' }}>
                        <CanvasDraw
                            ref={(canvasDraw) => {
                                canvasRef.current = canvasDraw
                            }}
                            brushColor={demoCanvasProps.color}
                            brushRadius={demoCanvasProps.brushRadius}
                            lazyRadius={demoCanvasProps.lazyRadius}
                            canvasWidth={demoCanvasProps.width}
                            canvasHeight={demoCanvasProps.height}
                        />
                    </div>
                    {/* {children} */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                        <Button text='建立簽名' callBack={saveSignature} />
                    </div>
                </>
            )}
            {!signing &&
                signatureList.map((signDataUrl, index) => (
                    <div key={index}>
                        <div>
                            <img src={signDataUrl} alt='signature' />
                        </div>
                        <button
                            type='button'
                            onClick={() => {
                                addSignOnCanvas(signDataUrl)
                                closeModal()
                            }}
                        >
                            選擇簽名
                        </button>
                        <button
                            type='button'
                            onClick={() => {
                                dispatch(removeSignData(index))
                            }}
                        >
                            刪除簽名
                        </button>
                    </div>
                ))}
        </ReactModal>
    )
}
