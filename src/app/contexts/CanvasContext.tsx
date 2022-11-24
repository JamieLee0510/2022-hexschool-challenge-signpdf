import { fabric } from 'fabric'
import { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'

const ConvasContext = createContext<fabric.Canvas | null>(null)
export default ConvasContext
