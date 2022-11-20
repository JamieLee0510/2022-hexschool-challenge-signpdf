export const disableDropSideEffect = (event: Event) => {
    event.stopPropagation()
    event.preventDefault()
}

export const isPdf = (filetype: string) => filetype === 'application/pdf'
export const isImage = (filetype: string) =>
    filetype === 'image/jpeg' || filetype === 'image/jpg' || filetype === 'image/png'
export const isProperFile = (filetype: string) => {
    if (isPdf(filetype) || isImage(filetype)) {
        return true
    }
    return false
}

export const getMousePos = (canvas: HTMLCanvasElement, evt: React.MouseEvent) => {
    const rect = canvas.getBoundingClientRect()
    console.log('evt.clientX:', evt.clientX)
    console.log('rect.left:', rect.left)
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
    }
}
export const getTouchPos = (canvas: Element, evt: React.TouchEvent) => {
    const rect = canvas.getBoundingClientRect()
    return {
        x: evt.touches[0].clientX - rect.left,
        y: evt.touches[0].clientY - rect.top,
    }
}
