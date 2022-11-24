import CancelIcon from '@assets/cancel_icon.png'
import Button from '@base/app/components/Button'
import CanvasContext from '@base/app/contexts/CanvasContext'
import { useAppDispatch, useAppSelector } from '@base/app/hooks'
import { getMousePos, getTouchPos } from '@base/utils/helper'
import { MainCanvas, SetMainCanvas } from '@base/utils/types'
import { fabric } from 'fabric'
import React, { ReactNode, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'
import ReactModal from 'react-modal'

import { addSignData, removeSignData } from '../signSlice'

ReactModal.setAppElement('#root')
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

const canvasProps = {
    color: 'black',
    width: 500,
    height: 150,
    brushRadius: 5,
    lazyRadius: 8,
}
export default function SignModal({
    children,
    isOpen,
    closeModal,
}: {
    children: ReactNode
    isOpen: boolean
    closeModal: () => void
}) {
    const dispatch = useAppDispatch()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canvasRef = useRef<any>(null)

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

    const fabricCanvas = useContext(CanvasContext)

    const addSignature = (imgData: string) => {
        fabric.Image.fromURL(imgData, (img) => {
            img.scaleToWidth(100)
            img.scaleToHeight(100)
            fabricCanvas?.add(img).renderAll()
        })
    }

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
                    src={CancelIcon}
                    alt='cancel'
                    style={{ height: '100%', width: '100%' }}
                    onClick={closeModal}
                    aria-hidden='true'
                />
            </div>

            {signing && (
                <>
                    <div style={{ marginTop: '40px' }}>
                        <CanvasDraw
                            ref={(canvasDraw) => {
                                canvasRef.current = canvasDraw
                            }}
                            brushColor={canvasProps.color}
                            brushRadius={canvasProps.brushRadius}
                            lazyRadius={canvasProps.lazyRadius}
                            canvasWidth={canvasProps.width}
                            canvasHeight={canvasProps.height}
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
                                addSignature(signDataUrl)
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
