import React from 'react'

type ImageWrapperProps = {
    imgUrl: string
}

export default function ImageWrapper({ imgUrl }: ImageWrapperProps) {
    return <img src={imgUrl} alt='logo' style={{ width: '100%', height: 'auto' }} />
}
