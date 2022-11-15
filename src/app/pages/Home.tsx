import React from 'react'
import { useNavigate } from 'react-router-dom'

import BasicLayout from '../components/layouts/BasicLayout'

export default function Home() {
    const navigate = useNavigate()
    return (
        <BasicLayout>
            <h1>hihi</h1>
            <button
                type='button'
                onClick={() => {
                    navigate('/step1')
                }}
            >
                第一頁
            </button>
        </BasicLayout>
    )
}
