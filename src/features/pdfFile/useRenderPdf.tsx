import { useAppDispatch, useAppSelector } from '@base/app/hooks'
import React, { useCallback, useEffect, useState } from 'react'
import { pdfjs } from 'react-pdf'

const useRenderPdf = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const pdfFile = useAppSelector((state) => state.pdf.pdfFile)
    const pdfData = useAppSelector((state) => state.pdf.pdfData)
    const [page, setPage] = useState(1)

    const renderPdf = useCallback(
        async (pdf: Uint8Array) => {
            const loadingTask = pdfjs.getDocument({ data: pdf })
            const pdfProxy = await loadingTask.promise
            const pageProxy = await pdfProxy.getPage(page)
            const viewport = pageProxy.getViewport({ scale: 1 })
            // Prepare canvas using PDF page dimensions
            // eslint-disable-next-line no-param-reassign
            canvas.height = viewport.height
            // eslint-disable-next-line no-param-reassign
            canvas.width = viewport.width
            // Render PDF page into canvas context

            const renderContext = {
                canvasContext: ctx,
                viewport,
            }
            // eslint-disable-next-line testing-library/render-result-naming-convention
            const renderTask = pageProxy.render(renderContext)
            renderTask.promise.then(() => {
                console.log('success')
            })
        },
        [canvas, ctx, page],
    )

    useEffect(() => {
        renderPdf(pdfFile!)
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
