import manImg from '@assets/landing/main02_icon01.png'
import womanImg from '@assets/landing/main02_icon02.png'
import boardImg from '@assets/landing/main02_icon03.png'
import productNameImg from '@assets/landing/main02_icon05.png'
import UploadArea from '@base/features/pdfFile/UploadArea'
import { ImgStyleProps, primaryColor, primaryDarkColor } from '@base/utils/styles'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import DotElement from '../components/DotElement'
import ImageWrapper from '../components/ImageWrapper'
import BasicLayout from '../components/layouts/BasicLayout'

const ImageDiv = styled.div<ImgStyleProps>`
    position: absolute;
    top: ${(props) => (props.top ? props.top : 'auto')};
    left: ${(props) => (props.left ? props.left : 'auto')};
    right: ${(props) => (props.right ? props.right : 'auto')};
    bottom: ${(props) => (props.bottom ? props.bottom : 'auto')};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    transform: ${(props) => (props.transform ? props.transform : 'null')};
    z-index: ${(props) => (props.zIndex ? props.zIndex : '1')};
`
const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`

export default function Home() {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <BasicLayout>
            <Container>
                <DotElement diameter={300} color='#F5CB94' top='0%' right='10%' />
                <DotElement diameter={200} color='#FFE4C0' bottom='20%' right='15%' />
                <DotElement diameter={180} color='#FCE6D4' top='10%' left='10%' />
                <DotElement diameter={300} color='#DED1C0' bottom='20%' left='10%' />
                <DotElement diameter={18} color={primaryDarkColor} top='12%' left='18%' />
                <DotElement diameter={18} color={primaryDarkColor} top='20%' left='30%' />
                <DotElement diameter={18} color={primaryDarkColor} top='40%' left='5%' />
                <DotElement diameter={18} color={primaryDarkColor} bottom='30%' left='25%' />
                <DotElement diameter={18} color={primaryDarkColor} top='10%' right='30%' />
                <DotElement diameter={18} color={primaryDarkColor} top='20%' right='20%' />
                <DotElement diameter={18} color={primaryDarkColor} bottom='20%' right='10%' />
                <ImageDiv
                    width='500px'
                    height='500px'
                    top='5%'
                    left='50%'
                    transform=' translate(-50%)'
                >
                    <UploadArea />
                    <ImageDiv
                        width='350px'
                        height='600px'
                        left='50%'
                        transform=' translate(-50%)'
                        zIndex={1}
                    >
                        <ImageWrapper imgUrl={boardImg} />
                    </ImageDiv>

                    <ImageDiv width='150px' height='100px' right='5%' top='40%' zIndex={5}>
                        <ImageWrapper imgUrl={womanImg} />
                    </ImageDiv>
                    <ImageDiv width='200px' height='100px' left='10%' bottom='10%' zIndex={5}>
                        <ImageWrapper imgUrl={productNameImg} />
                    </ImageDiv>
                    <ImageDiv width='200px' height='100px' left='8%' bottom='30%' zIndex={5}>
                        <ImageWrapper imgUrl={manImg} />
                    </ImageDiv>
                </ImageDiv>
                <h1>hihi</h1>
                <button
                    type='button'
                    onClick={() => {
                        navigate('/step1')
                    }}
                >
                    第一頁
                </button>
                <button
                    type='button'
                    onClick={() => {
                        console.log('route:', location.pathname)
                    }}
                >
                    test route path
                </button>
            </Container>
        </BasicLayout>
    )
}
