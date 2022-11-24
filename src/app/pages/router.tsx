import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Home from './Home'
import Step1 from './SignPage'

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
])

export default router
