import { BtnStyleProps, primaryColor } from '@base/utils/styles'
import React from 'react'
import styled from 'styled-components'

const BtnStyle = styled.button<BtnStyleProps>`
    background-color: ${primaryColor};
    width: ${(props) => (props.width ? props.width : '100px')};
    height: ${(props) => (props.height ? props.height : '40px')};
    border: solid white;
    border-radius: 10px;
    font-size: ${(props) => (props.fontSize ? props.fontSize : ' 1.3rem')};
    color: white;
`

export default function Button({ text, callBack }: { text: string; callBack: () => void }) {
    return (
        <BtnStyle
            onClick={() => {
                callBack()
            }}
        >
            {text}
        </BtnStyle>
    )
}
