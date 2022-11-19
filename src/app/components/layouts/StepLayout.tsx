import { PureChildrenProps, StepLayoutProps } from '@base/utils/types'
import React, { ReactElement } from 'react'

import ProgressLine from '../ProgressLine'
import BasicLayout from './BasicLayout'
import FunctionBar from './FunctionBar'

export default function StepLayout({ children, step }: StepLayoutProps) {
    return (
        <BasicLayout>
            {/* <FunctionBar step={step} /> */}
            <ProgressLine step={step} />
            {children}
        </BasicLayout>
    )
}
