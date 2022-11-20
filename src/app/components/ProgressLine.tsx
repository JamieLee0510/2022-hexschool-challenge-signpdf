import { LineStyleProps, primaryColor, primaryDarkColor } from '@base/utils/styles'
import { Step } from '@base/utils/types'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 30px;

    display: flex;
    justify-content: start;
    margin-top: 3px;
`
const Hr = styled.div<LineStyleProps>`
    height: 5px;
    background: ${(props) => props.color};
    width: 140px;
    border-radius: 5px;
    margin-right: 10px;
`

export default function ProgressLine({ step }: { step: Step }) {
    return (
        <>
            <Container>Modifying documents {step} of 3</Container>
            <Container>
                <Hr color={primaryColor} />
                <Hr color={step !== Step.one ? primaryColor : primaryDarkColor} />
                <Hr color={step === Step.three ? primaryColor : primaryDarkColor} />
            </Container>
        </>
    )
}
