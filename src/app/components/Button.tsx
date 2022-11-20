import { BtnStyleProps, primaryColor } from '@base/utils/styles'
import React from 'react'
import styled from 'styled-components'

const BtnStyle = styled.button<BtnStyleProps>`
    background-color: ${(props) => (props.btnColor ? props.btnColor : primaryColor)};
    width: ${(props) => (props.width ? props.width : '100px')};
    height: ${(props) => (props.height ? props.height : '40px')};
    border: solid white;
    border-radius: 10px;
    font-size: ${(props) => (props.fontSize ? props.fontSize : ' 1.3rem')};
    color: white;
`

export default function Button({
    text,
    callBack,
    btnColor,
}: {
    text: string
    callBack: () => void
    // eslint-disable-next-line react/require-default-props
    btnColor?: string
}) {
    return (
        <BtnStyle
            onClick={() => {
                callBack()
            }}
            btnColor={btnColor}
        >
            {text}
        </BtnStyle>
    )
}
