import { useAppDispatch } from '@base/app/hooks'
import { isPdf } from '@base/utils/helper'
import { FormatSize, OriginPdf, UploadFile, UploadPdfFunc } from '@base/utils/types'
import { Buffer } from 'buffer'
import { PageViewport, PDFPageProxy } from 'pdfjs-dist'
import * as pdfjs from 'pdfjs-dist/build/pdf'

export function readPdf(file: File) {
    return new Promise((resolve: (args: OriginPdf) => void) => {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
        const reader = new FileReader()

        reader.onload = async function () {
            const Base64Prefix = 'data:application/pdf;base64,'
            const pdfData = Buffer.from(
                (reader.result as string).substring(Base64Prefix.length),
                'base64',
            )
            const loadingTask = pdfjs.getDocument({ data: pdfData })
            const pdfDoc = await loadingTask.promise
            // get total page
            const totalPage = pdfDoc.numPages

            const pdfFile = {
                fileName: file.name,
                data: [] as Array<PDFPageProxy>,
            }

            // slice data to array by page
            for (let i = 1; i <= totalPage; i++) {
                // eslint-disable-next-line no-await-in-loop
                const pageData = await pdfDoc.getPage(i)
                pdfFile.data.push(pageData)
            }

            resolve(pdfFile)
        }
        reader.readAsDataURL(file)
    })
}

export function getViewportSize(pageProxy: PDFPageProxy): {
    viewport: PageViewport
    size: FormatSize
} {
    const scale = 1.5
    const viewport = pageProxy.getViewport({ scale })
    return { viewport, size: { width: viewport.width, height: viewport.height } }
}

export async function turnPdfToCanvasUrl(pageProxy: PDFPageProxy): Promise<string> {
    const canvasdiv = document.getElementById('canvas-div')
    const canvasDemo = document.createElement('canvas')
    canvasdiv!.appendChild(canvasDemo)
    const customViewport = getViewportSize(pageProxy)
    canvasDemo.height = customViewport.size.height
    canvasDemo.width = customViewport.size.width
    const context = canvasDemo.getContext('2d')
    const renderContext = {
        canvasContext: context as CanvasRenderingContext2D,
        viewport: customViewport.viewport,
    }
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const renderTask = pageProxy.render(renderContext)
    return renderTask.promise.then(() => {
        const canvasStr = canvasDemo.toDataURL()
        canvasDemo.remove()
        return canvasStr
    })
}

// export default uploadFile
