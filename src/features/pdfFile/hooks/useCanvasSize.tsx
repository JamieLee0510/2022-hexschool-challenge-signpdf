import { useAppDispatch, useAppSelector } from '@base/app/hooks'
import { useEffect } from 'react'

import { setScale } from '../pdfSlice'

const useCanvasSize = () => {
    const scaleSize = useAppSelector((state) => ({
        height: state.pdf.value.size.height * state.pdf.scale,
        width: state.pdf.value.size.width * state.pdf.scale,
    }))
    const scale = useAppSelector((state) => state.pdf.scale)
    const dispatch = useAppDispatch()

    useEffect(() => {
        let changeScale = scale
        const changeSize = scaleSize
        while (changeSize.height * changeScale >= 800 || changeSize.width * changeScale >= 1000) {
            changeScale -= 0.1
        }
        dispatch(setScale(changeScale))
    }, [dispatch, scale, scaleSize])

    return scaleSize
}

export default useCanvasSize
