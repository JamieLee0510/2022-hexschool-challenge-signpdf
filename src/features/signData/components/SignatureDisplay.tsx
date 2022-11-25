import ImageWrapper from '@base/app/components/ImageWrapper'
import { useAppDispatch, useAppSelector } from '@base/app/hooks'
import { LineStyleProps, primaryColor } from '@base/utils/styles'
import { removeSignData } from '@features/signData/signSlice'
import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-item: center;
`

const SignatureRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
`

const SignatureWrapper = styled.div<LineStyleProps>`
    width: 250px;
    height: 60px;
    border-radius: 10px;
    border: solid black;
    border-width: thin;
    background-color: ${(props) => props.color};
    margin: 3px;
`
const SignImgWrapper = styled.img`
    height: 100%;
    width: auto;
`

const ModifySignatureBtn = styled.div`
    display: inline-block;
    height: 30px;
    width: 90px;
    margin: 3px;
    cursor: pointer;
    color: ${primaryColor};
    &:hover {
        background-color: lightgrey;
    }
    border-radius: 10px;
    text-align: center;
    line-height: 30px;
`

const TitleWrapper = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translate(-50%);
`

export default function SignatureDisplay({
    signatureList,
    addSignCallback,
    signCallback,
}: {
    signatureList: Array<string>
    addSignCallback: () => void
    signCallback: (args: string) => void
}) {
    const dispatch = useAppDispatch()
    const [selectList, setSelectList] = useState<Array<boolean>>(
        Array.from({ length: signatureList.length }, () => false),
    )

    return (
        <Container>
            <TitleWrapper>
                <h2>我的簽名</h2>
            </TitleWrapper>
            <div style={{ height: '50px' }}>
                {signatureList.length < 2 ? (
                    <ModifySignatureBtn
                        onClick={() => {
                            addSignCallback()
                        }}
                    >
                        + 新增簽名
                    </ModifySignatureBtn>
                ) : (
                    <div />
                )}
            </div>
            {signatureList.map((signDataUrl, index) => (
                <SignatureRow key={index}>
                    <SignatureWrapper
                        color={selectList[index] ? primaryColor : 'white'}
                        onClick={() => {
                            if (selectList[index]) {
                                signCallback(signDataUrl)
                            } else {
                                setSelectList((pre) => {
                                    const next = pre.map((ele, idx) => {
                                        let data: boolean
                                        if (idx === index) {
                                            data = true
                                        } else {
                                            data = false
                                        }
                                        return data
                                    })
                                    return next
                                })
                            }
                        }}
                    >
                        <SignImgWrapper src={signDataUrl} alt='signature' />
                    </SignatureWrapper>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <ModifySignatureBtn
                            onClick={() => {
                                dispatch(removeSignData(index))
                            }}
                        >
                            刪除簽名
                        </ModifySignatureBtn>
                    </div>
                </SignatureRow>
            ))}
        </Container>
    )
}
