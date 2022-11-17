import { useAppDispatch } from '@base/app/hooks'
import { isPdf } from '@base/utils/helper'
import { UploadFile, UploadPdfFunc } from '@base/utils/types'
import { useState } from 'react'
import { pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const pdfToConvasUrl = (file: File, callback: UploadPdfFunc) => {
    const fileReader = new FileReader()
    const success = callback()

    fileReader.onload = async function () {
        const pdfData = new Uint8Array(this.result as ArrayBuffer)
        const canvasdiv = document.getElementById('canvas-div')

        // Using DocumentInitParameters object to load binary data.
        const loadingTask = pdfjs.getDocument({ data: pdfData })
        // loadingTask.promise.then(
        //     (pdf) => {
        //         // Fetch pages

        //         for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        //             const canvasDemo = document.createElement('canvas')
        //             canvasdiv?.appendChild(canvasDemo)

        //             pdf.getPage(pageNumber).then((pageProxy) => {
        //                 const scale = 1.5
        //                 const viewport = pageProxy.getViewport({ scale })

        //                 // Prepare canvas using PDF page dimensions
        //                 canvasDemo.height = viewport.height
        //                 canvasDemo.width = viewport.width
        //                 const context = canvasDemo.getContext('2d')
        //                 // Render PDF page into canvas context
        //                 const renderContext = {
        //                     canvasContext: context as CanvasRenderingContext2D,
        //                     viewport,
        //                 }

        //                 // eslint-disable-next-line testing-library/render-result-naming-convention
        //                 const renderTask = pageProxy.render(renderContext)

        //                 renderTask.promise.then(() => {
        //                     console.log('renderTask')

        //                     success({
        //                         type: UploadFile.PDF,
        //                         data: canvasDemo.toDataURL('image/png'),
        //                     })
        //                 })
        //             })
        //         }
        //     },
        //     (reason) => {
        //         // PDF loading error
        //         console.error(reason)
        //     },
        // )

        const promises: unknown[] = []
        const dataList: Array<string> = []
        const pdfProxy = await loadingTask.promise
        for (let pageNumber = 1; pageNumber <= pdfProxy.numPages; pageNumber += 1) {
            const canvasDemo = document.createElement('canvas')
            canvasdiv?.appendChild(canvasDemo)
            // eslint-disable-next-line no-await-in-loop
            const pdfPageData = await pdfProxy.getPage(pageNumber)
            const scale = 1.5
            const viewport = pdfPageData.getViewport({ scale })
            // Prepare canvas using PDF page dimensions
            canvasDemo.height = viewport.height
            canvasDemo.width = viewport.width
            const context = canvasDemo.getContext('2d')
            // Render PDF page into canvas context
            const renderContext = {
                canvasContext: context as CanvasRenderingContext2D,
                viewport,
            }

            // eslint-disable-next-line testing-library/render-result-naming-convention
            const renderTask = pdfPageData.render(renderContext)
            promises.push(
                renderTask.promise.then(() => {
                    dataList.push(canvasDemo.toDataURL('image/png'))
                }),
            )
        }
        Promise.all([...promises]).then(() => {
            success(
                {
                    type: UploadFile.PDF,
                    data: dataList,
                },
                pdfData,
            )
        })
    }
    fileReader.readAsArrayBuffer(file)
}

const uploadFile = (file: File, callback: UploadPdfFunc) => {
    const uploadData = { type: '', data: null }

    if (isPdf(file.type)) {
        pdfToConvasUrl(file, callback)
    } else {
        // dispatch(setFileType('image'))
    }
}

export default uploadFile
