export const primaryColor = '#E49B3D'
export const primaryDarkColor = '#76737A'
export const secondaryColor = '#DAC4B7'
export const secondaryDardColor = '#DDD8D4'
export const bgColor = '#f5f5f5'

export interface BtnStyleProps {
    width?: string
    height?: string
    fontSize?: string
}

export interface ImgStyleProps {
    width: string
    height?: string
    top?: number | string
    left?: number | string
    right?: number | string
    bottom?: number | string
    transform?: string
    zIndex?: number
}

export interface DotStyleProps {
    diameter: number
    color: string
    top?: number | string
    left?: number | string
    right?: number | string
    bottom?: number | string
}
