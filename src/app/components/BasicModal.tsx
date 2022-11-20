import CancelIcon from '@assets/cancel_icon.png'
import { getMousePos, getTouchPos } from '@base/utils/helper'
import React, { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import CanvasDraw from 'react-canvas-draw'
import ReactModal from 'react-modal'

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
        height: '40vh',
        width: '40%',
        display: 'flex',
        flexDirection: 'column' as const,
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
}
export default function BasicModal({
    children,
    isOpen,
    closeModal,
    handleCloseModal,
}: {
    children: ReactNode
    isOpen: boolean
    closeModal: () => void
    handleCloseModal: () => void
}) {
    const cancelBtn = useRef<HTMLImageElement>(null)

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
    const demoCanvasRef = useRef<any>(null)

    const demoCanvas = () => {
        console.log(demoCanvasRef.current!.getDataURL())
    }
    const demoCanvasProps = {
        color: '#ffc600',
        width: 400,
        height: 400,
        brushRadius: 10,
        lazyRadius: 12,
    }

    return (
        <ReactModal
            isOpen={isOpen}
            contentLabel='modal'
            onRequestClose={handleCloseModal}
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

            <CanvasDraw
                ref={(canvasDraw) => {
                    demoCanvasRef.current = canvasDraw
                }}
                brushColor={demoCanvasProps.color}
                brushRadius={demoCanvasProps.brushRadius}
                lazyRadius={demoCanvasProps.lazyRadius}
                canvasWidth={demoCanvasProps.width}
                canvasHeight={demoCanvasProps.height}
            />
            {/* 測試區域結束 */}
            {children}
            <button type='button' onClick={handleCloseModal}>
                Close Modal
            </button>
            <button type='button' onClick={demoCanvas}>
                test
            </button>
        </ReactModal>
    )
}
