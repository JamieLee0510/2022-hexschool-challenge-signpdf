import { useAppDispatch, useAppSelector } from '@base/app/hooks'
import { fabric } from 'fabric'
import * as pdfjs from 'pdfjs-dist/build/pdf'
import React, { useCallback, useEffect, useState } from 'react'

export const canvasOriginalHeight = 800
export const canvasOriginalWidth = 530

export const setCanvasZoom = (canvas: fabric.Canvas) => {
    const canvasWidth = canvasOriginalWidth * 1
    const canvasHeight = canvasOriginalHeight * 1

    canvas.setWidth(canvasWidth)
    canvas.setHeight(canvasHeight)
    return { canvasWidth, canvasHeight }
}

export const scaleAndPositionImage = (canvas: fabric.Canvas, bgImg: fabric.Image) => {
    const { canvasWidth, canvasHeight } = setCanvasZoom(canvas)

    // 原本 canvas 的長寬比
    const canvasAspect = canvasWidth / canvasHeight
    const [imgWidth, imgHeight] = [bgImg.width!, bgImg!.height!]

    // image 的長寬比
    const imgAspect = imgWidth / imgHeight
    let left
    let top
    let scaleFactor

    if (canvasAspect >= imgAspect) {
        scaleFactor = canvasWidth / bgImg.width!
        left = 0
        top = -(imgHeight * scaleFactor - canvasHeight) / 2
    } else {
        scaleFactor = canvasHeight / imgHeight
        top = 0
        left = -(imgWidth * scaleFactor - canvasWidth) / 2
    }

    // 等比例縮放，但有裁切
    canvas.setBackgroundImage(bgImg, canvas.renderAll.bind(canvas), {
        top,
        left,
        originX: 'left',
        originY: 'top',
        scaleX: scaleFactor,
        scaleY: scaleFactor,
    })
}

const useRenderPdf = (canvas: fabric.Canvas, ctx: CanvasRenderingContext2D) => {
    const pdfFile = useAppSelector((state) => state.pdf.pdfFile)
    const pdfData = useAppSelector((state) => state.pdf.pdfData)
    const [page, setPage] = useState(1)

    // const renderPdf = useCallback(
    //     async (pdf: Uint8Array) => {
    //         const loadingTask = pdfjs.getDocument({ data: pdf })
    //         const pdfProxy = await loadingTask.promise
    //         const pageProxy = await pdfProxy.getPage(page)
    //         const viewport = pageProxy.getViewport({ scale: 1 })
    //         // Prepare canvas using PDF page dimensions
    //         // eslint-disable-next-line no-param-reassign
    //         canvas.height = viewport.height
    //         // eslint-disable-next-line no-param-reassign
    //         canvas.width = viewport.width
    //         // Render PDF page into canvas context

    //         const renderContext = {
    //             canvasContext: ctx,
    //             viewport,
    //         }
    //         // eslint-disable-next-line testing-library/render-result-naming-convention
    //         const renderTask = pageProxy.render(renderContext)
    //         renderTask.promise.then(() => {
    //             console.log('success')
    //         })
    //     },
    //     [canvas, ctx, page],
    // )

    const renderPdf = useCallback(() => {
        fabric.Image.fromURL(pdfData[page - 1], (img) => {
            scaleAndPositionImage(canvas, img)
        })
    }, [canvas, page, pdfData])

    useEffect(() => {
        renderPdf()
    }, [ctx, page, pdfFile, renderPdf])

    const forwardPage = () => {
        if (page <= pdfData.length + 1) {
            setPage((pre) => pre + 1)
        }
    }
    const backwardPage = () => {
        if (page > 1) {
            setPage((pre) => pre - 1)
        }
    }

    return [backwardPage, forwardPage]
}
export default useRenderPdf
