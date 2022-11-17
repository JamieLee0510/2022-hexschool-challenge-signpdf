import PreviewArea from '@base/features/pdfFile/PreviewArea'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'

import StepLayout from '../components/layouts/StepLayout'

export default function Step1() {
    return (
        <StepLayout>
            <PreviewArea />
        </StepLayout>
    )
}
