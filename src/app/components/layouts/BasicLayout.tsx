// eslint-disable-next-line import/extensions
import logoImg from '@assets/brand.png'
import { PureChildrenProps } from '@base/utils/types'
import React, { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

import ImageWrapper from '../ImageWrapper'
import Loading from '../Loading'

const Contaner = styled.div`
    width: 95%;
    height: 100vh;
    display: flex;

    margin-top: 30px;
    margin-left: 30px;
    margin-right: 30px;

    flex-direction: column;
    overflow-x: hidden;
    overflow-y: hidden;
`
const Logo = styled.div`
    width: 200px;
    height: 50px;
`

export default function BasicLayout({ children }: PureChildrenProps) {
    return (
        <Contaner>
            <Logo>
                <ImageWrapper imgUrl={logoImg} />
            </Logo>

            {children}
        </Contaner>
    )
}
