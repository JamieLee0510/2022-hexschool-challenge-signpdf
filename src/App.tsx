import React from 'react'
import { RouterProvider } from 'react-router'

import router from './app/pages/router'
import { Counter } from './features/counter/Counter'

function App() {
    return <RouterProvider router={router} />
}

export default App

// function App() {
//     return (
//         <div className='App'>
//             <header className='App-header'>
//                 <Loading loadingText='建立中' size={150} />
//                 <img src={logo} className='App-logo' alt='logo' />
//                 <Counter />
//                 <p>
//                     Edit <code>src/App.tsx</code> and save to reload.
//                 </p>
//                 <span>
//                     <span>Learn </span>
//                     <a
//                         className='App-link'
//                         href='https://reactjs.org/'
//                         target='_blank'
//                         rel='noopener noreferrer'
//                     >
//                         React
//                     </a>
//                     <span>, </span>
//                     <a
//                         className='App-link'
//                         href='https://redux.js.org/'
//                         target='_blank'
//                         rel='noopener noreferrer'
//                     >
//                         Redux
//                     </a>
//                     <span>, </span>
//                     <a
//                         className='App-link'
//                         href='https://redux-toolkit.js.org/'
//                         target='_blank'
//                         rel='noopener noreferrer'
//                     >
//                         Redux Toolkit
//                     </a>
//                     ,<span> and </span>
//                     <a
//                         className='App-link'
//                         href='https://react-redux.js.org/'
//                         target='_blank'
//                         rel='noopener noreferrer'
//                     >
//                         React Redux
//                     </a>
//                 </span>
//             </header>
//         </div>
//     )
// }
