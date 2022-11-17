import React, { useLayoutEffect, useRef } from 'react'

type LoadingProps = {
    loadingText: string
    size: number
}

export default function Loading({ loadingText, size }: LoadingProps) {
    const loadingRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        if (loadingRef.current !== null) {
            loadingRef.current.style.width = `${size}px`
            loadingRef.current.style.height = `${size}px`
        }
    }, [size])

    return (
        <div className='loading' ref={loadingRef}>
            <div className='lds'>
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>
            <div className='loading-text'>{loadingText}</div>
        </div>
    )
}
