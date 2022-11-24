import { useAppDispatch } from '@base/app/hooks'
import { isPdf } from '@base/utils/helper'
import { FormatSize, OriginPdf, UploadFile, UploadPdfFunc } from '@base/utils/types'
import { Buffer } from 'buffer'
import { PageViewport, PDFPageProxy } from 'pdfjs-dist'
import * as pdfjs from 'pdfjs-dist/build/pdf'
import { useState } from 'react'

// const pdfToConvasUrl = (file: File, callback: UploadPdfFunc) => {
//     const fileReader = new FileReader()
//     const success = callback()

//     fileReader.onload = async function () {
//         const pdfData = new Uint8Array(this.result as ArrayBuffer)
//         const canvasdiv = document.getElementById('canvas-div')

//         // Using DocumentInitParameters object to load binary data.
//         const loadingTask = pdfjs.getDocument({ data: pdfData })
//         // loadingTask.promise.then(
//         //     (pdf) => {
//         //         // Fetch pages

//         //         for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
//         //             const canvasDemo = document.createElement('canvas')
//         //             canvasdiv?.appendChild(canvasDemo)

//         //             pdf.getPage(pageNumber).then((pageProxy) => {
//         //                 const scale = 1.5
//         //                 const viewport = pageProxy.getViewport({ scale })

//         //                 // Prepare canvas using PDF page dimensions
//         //                 canvasDemo.height = viewport.height
//         //                 canvasDemo.width = viewport.width
//         //                 const context = canvasDemo.getContext('2d')
//         //                 // Render PDF page into canvas context
//         //                 const renderContext = {
//         //                     canvasContext: context as CanvasRenderingContext2D,
//         //                     viewport,
//         //                 }

//         //                 // eslint-disable-next-line testing-library/render-result-naming-convention
//         //                 const renderTask = pageProxy.render(renderContext)

//         //                 renderTask.promise.then(() => {
//         //                     console.log('renderTask')

//         //                     success({
//         //                         type: UploadFile.PDF,
//         //                         data: canvasDemo.toDataURL('image/png'),
//         //                     })
//         //                 })
//         //             })
//         //         }
//         //     },
//         //     (reason) => {
//         //         // PDF loading error
//         //         console.error(reason)
//         //     },
//         // )

//         const promises: unknown[] = []
//         const dataList: Array<string> = []
//         const pdfProxy = await loadingTask.promise
//         let pdfSize: FormatSize
//         for (let pageNumber = 1; pageNumber <= pdfProxy.numPages; pageNumber += 1) {
//             const canvasDemo = document.createElement('canvas')
//             canvasdiv?.appendChild(canvasDemo)
//             // eslint-disable-next-line no-await-in-loop
//             const pdfPageData = await pdfProxy.getPage(pageNumber)
//             const scale = 1.5
//             const viewport = pdfPageData.getViewport({ scale })
//             // Prepare canvas using PDF page dimensions
//             canvasDemo.height = viewport.height
//             canvasDemo.width = viewport.width
//             pdfSize = { height: viewport.height, width: viewport.width }
//             const context = canvasDemo.getContext('2d')
//             // Render PDF page into canvas context
//             const renderContext = {
//                 canvasContext: context as CanvasRenderingContext2D,
//                 viewport,
//             }

//             // eslint-disable-next-line testing-library/render-result-naming-convention
//             const renderTask = pdfPageData.render(renderContext)
//             promises.push(
//                 renderTask.promise.then(() => {
//                     dataList.push(canvasDemo.toDataURL('image/png'))
//                 }),
//             )
//         }

//         // TODO: need to confirm the order of pdf data
//         Promise.all([...promises]).then((resolve) => {
//             console.log(resolve)
//             success({
//                 fileType: UploadFile.PDF,
//                 data: dataList,
//                 size: pdfSize,
//                 name: file.name,
//             })
//         })
//     }
//     fileReader.readAsArrayBuffer(file)
// }

// const uploadFile = (file: File, callback: UploadPdfFunc) => {
//     const uploadData = { type: '', data: null }

//     if (isPdf(file.type)) {
//         pdfToConvasUrl(file, callback)
//     } else {
//         // dispatch(setFileType('image'))
//     }
// }

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
                console.log('pageData:', i)
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
