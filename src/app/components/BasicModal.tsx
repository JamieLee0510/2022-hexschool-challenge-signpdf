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

    // create sign area

    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
    const [ctx, setCtx] = useState<CanvasRenderingContext2D>()
    const [src, setSrc] = useState<string | null>(null)

    const [drawing, setDrawing] = useState(false)

    useEffect(() => {
        const c = canvasRef.current
        if (c == null) return

        setCtx(c.getContext('2d')!)
        setCanvas(c)
    }, [canvasRef])
    /** 開始 */
    const handleTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
        console.log('hihi handleTouchStart')
        setDrawing(true)
        const touchPos = getTouchPos(canvas!, event)

        // ctx!.beginPath(touchPos.x, touchPos.y)
        ctx!.beginPath()
        ctx!.moveTo(touchPos.x, touchPos.y)
        event.preventDefault()
    }

    const handleMouseDown = (event: React.MouseEvent) => {
        console.log('hihi handleMouseDown')
        setDrawing(true)
        const mousePos = getMousePos(canvas!, event)
        console.log('mousePos:', mousePos)
        console.log('ctx:', ctx)
        ctx!.beginPath()
        ctx!.moveTo(mousePos.x, mousePos.y)
        event.preventDefault()
    }

    /** 移動 */
    const handleTouchMove = (event: React.TouchEvent) => {
        console.log('hihi handleTouchMove')
        if (!drawing) return
        const touchPos = getTouchPos(canvas!, event)
        ctx!.lineWidth = 2
        ctx!.lineCap = 'round' // 繪制圓形的結束線帽
        ctx!.lineJoin = 'round' // 兩條線條交匯時，建立圓形邊角
        ctx!.shadowBlur = 1 // 邊緣模糊，防止直線邊緣出現鋸齒
        ctx!.shadowColor = 'black' // 邊緣顏色
        ctx!.lineTo(touchPos.x, touchPos.y)
        ctx!.stroke()
    }

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!drawing) return
        const mousePos = getMousePos(canvas!, event)
        ctx!.lineWidth = 2
        ctx!.lineCap = 'round' // 繪制圓形的結束線帽
        ctx!.lineJoin = 'round' // 兩條線條交匯時，建立圓形邊角
        ctx!.shadowBlur = 1 // 邊緣模糊，防止直線邊緣出現鋸齒
        ctx!.shadowColor = 'black' // 邊緣顏色
        ctx!.lineTo(mousePos.x, mousePos.y)
        ctx!.stroke()
    }

    /** 結束 */
    const handleTouchEnd = (event: React.TouchEvent) => {
        setDrawing(false)
    }

    const handleMouseUp = (event: React.MouseEvent) => {
        setDrawing(false)
    }

    /** 清除 */
    const handleClear = () => {
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
    }

    /** 轉圖片 */
    const handleConvertToImage = () => {
        const image = canvas!.toDataURL()
        setSrc(image)
    }

    const test = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        console.log('hihi')
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
            {/* 測試區域  */}

            <canvas
                style={{ background: '#EEE' }}
                ref={canvasRef}
                width={canvasSize}
                height={canvasSize}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />
            {/* <CanvasDraw /> */}
            {/* 測試區域結束 */}
            {children}
            <button type='button' onClick={handleCloseModal}>
                Close Modal
            </button>
            <button type='button' onClick={test}>
                test
            </button>
        </ReactModal>
    )
}
