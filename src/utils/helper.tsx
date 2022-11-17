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
