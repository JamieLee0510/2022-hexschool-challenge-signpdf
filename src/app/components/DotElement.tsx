import { DotStyleProps } from '@base/utils/styles'
import styled from 'styled-components'

const DotElement = styled.div<DotStyleProps>`
    width: ${(props) => props.diameter}px;
    height: ${(props) => props.diameter}px;
    border-radius: ${(props) => props.diameter / 2}px;
    background-color: ${(props) => props.color};
    position: absolute;
    top: ${(props) => (props.top ? props.top : 'auto')};
    left: ${(props) => (props.left ? props.left : 'auto')};
    right: ${(props) => (props.right ? props.right : 'auto')};
    bottom: ${(props) => (props.bottom ? props.bottom : 'auto')};
`

export default DotElement
