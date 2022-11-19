import dateIcon from '@assets/funcIcon/icon_calendar.png'
import checkIcon from '@assets/funcIcon/icon_checked.png'
import penIcon from '@assets/funcIcon/icon_pen.png'
import textIcon from '@assets/funcIcon/icon_text.png'
import { FuncBarOptions, Step } from '@base/utils/types'
import ImageWrapper from '@components/ImageWrapper'
import React from 'react'
import styled from 'styled-components'

import Button from '../Button'

const Container = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-item: center;
`
const FuncIconRow = styled.div`
    width: 300px;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-item: center;
`

const IconContainer = styled.div`
    width: 30px;
    height: 30px;
`

const Line = styled.div`
    height: 30px;
    border-left: 1px solid black;
`

const BtnContainer = styled.div`
    width: 250px;
    display: flex;
    justify-content: space-around;
    align-item: center;
    margin-right: 100px;
`

const ImageCssWrapper = styled.div`
    background-image: url(${dateIcon});
    width: 100%;
    height: auto;
`

export default function FunctionBar({
    step,
    funcBarOptions,
}: {
    step: Step
    funcBarOptions: FuncBarOptions
}) {
    return (
        <Container>
            <FuncIconRow>
                <IconContainer onClick={funcBarOptions.pen}>
                    <ImageWrapper imgUrl={penIcon} />
                </IconContainer>
                <Line />
                <IconContainer onClick={funcBarOptions.text}>
                    <ImageWrapper imgUrl={textIcon} />
                </IconContainer>
                <Line />
                <IconContainer onClick={funcBarOptions.date}>
                    <ImageWrapper imgUrl={dateIcon} />
                    {/* <ImageCssWrapper /> */}
                </IconContainer>
                <Line />
                <IconContainer onClick={funcBarOptions.checked}>
                    <ImageWrapper imgUrl={checkIcon} />
                </IconContainer>
            </FuncIconRow>
            <BtnContainer>
                <Button text={funcBarOptions.btn1.text} callBack={funcBarOptions.btn1.func} />
                <Button text={funcBarOptions.btn2.text} callBack={funcBarOptions.btn2.func} />
            </BtnContainer>
        </Container>
    )
}
