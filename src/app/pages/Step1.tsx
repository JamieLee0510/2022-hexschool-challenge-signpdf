import React from 'react'
import { useLocation } from 'react-router'

import BasicLayout from '../components/layouts/BasicLayout'
import StepLayout from '../components/layouts/StepLayout'

export default function Step1() {
    const location = useLocation()

    return (
        <StepLayout>
            <h1>hihi</h1>
            <button
                onClick={() => {
                    console.log('location:', location.pathname)
                }}
                type='button'
            >
                test
            </button>
        </StepLayout>
    )
}
