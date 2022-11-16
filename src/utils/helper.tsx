export const disableDropSideEffect = (event: Event) => {
    event.stopPropagation()
    event.preventDefault()
}
