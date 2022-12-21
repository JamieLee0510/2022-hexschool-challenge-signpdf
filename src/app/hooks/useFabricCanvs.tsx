import customFabricDeleteIcon from '@base/utils/helper'
import { fabric } from 'fabric'
import { useEffect, useRef, useState } from 'react'

const useFabricCanvas = (): fabric.Canvas | null => {
    // init render state
    const initRender = useRef(true)
    // variables between re-render
    const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null)
    useEffect(() => {
        if (initRender.current) {
            setFabricCanvas(new fabric.Canvas('file-canvas'))
            customFabricDeleteIcon()
        }
        return () => {
            initRender.current = false
        }
    }, [])
    return fabricCanvas
}

export default useFabricCanvas
