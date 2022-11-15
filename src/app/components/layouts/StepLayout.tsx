import { PureChildrenProps } from '@base/utils/types'
import React, { ReactElement } from 'react'

import BasicLayout from './BasicLayout'
import FunctionBar from './FunctionBar'

export default function StepLayout({ children }: PureChildrenProps) {
    return (
        <BasicLayout>
            <FunctionBar />
            <h1>hihi</h1>
            {children}
        </BasicLayout>
    )
}
