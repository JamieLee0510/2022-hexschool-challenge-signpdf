import { defaultCounterState } from '@features/counter/counterSlice'
import { configureStore } from '@reduxjs/toolkit'
import { render as rtlRender, RenderOptions, RenderResult } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import { configureSelfStore, RootState } from '../../app/store'

const defaultState = {
    counter: defaultCounterState,
}

type CustomRenderOptions = {
    preloadedState?: RootState
    routeHistory?: Array<string>
    initialRouteIndex?: number
    renderOptions?: Omit<RenderOptions, 'wrapper'> // Omit:刪除一個物件屬性
}
interface Props {
    children: React.ReactNode
}

type CustromRenderResult = RenderResult & { history: MemoryHistory }
function render(
    ui: ReactElement,
    { preloadedState, routeHistory, initialRouteIndex, ...renderOptions }: CustomRenderOptions = {},
): CustromRenderResult {
    const history = createMemoryHistory({
        initialEntries: routeHistory,
        initialIndex: initialRouteIndex,
    })
    // eslint-disable-next-line react/function-component-definition
    const Wrapper: React.FC<Props> = ({ children }) => {
        const store = configureSelfStore(preloadedState)
        // 這邊是為了Router的參數 ‘location’而設置
        const [state, setState] = React.useState({
            action: history.action,
            location: history.location,
        })
        return (
            <Provider store={store}>
                <Router navigator={history} location={state.location} navigationType={state.action}>
                    {children}
                </Router>
            </Provider>
        )
    }
    const utils = rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
    return { ...utils, history }
}
export * from '@testing-library/react'
export { render }
