import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Home from './Home'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <Home />,
    },
    {
        path: '/step1',
        element: <Step1 />,
        errorElement: <Home />,
    },
    {
        path: '/step2',
        element: <Step2 />,
        errorElement: <Home />,
    },
    {
        path: '/step3',
        element: <Step3 />,
        errorElement: <Home />,
    },
])

export default router
