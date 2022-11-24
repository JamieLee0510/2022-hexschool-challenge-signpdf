import Step1 from '@base/app/pages/SignPage'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@utils/test-utils'
import React from 'react'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './app/store'

test('init test', () => {
    render(<Step1 />, {})
})

// test('renders learn react link', async () => {
//     render(<App />, {
//         preloadedState: {
//             counter: {
//                 value: 5,
//                 status: 'idle',
//             },
//         },
//     })
//     const addBtn = screen.getByRole('button', { name: /Increment value/i })
//     userEvent.click(addBtn)

//     await waitFor(() => {
//         const num = screen.getByText('6')
//         expect(num).toBeInTheDocument()
//     })
// })
