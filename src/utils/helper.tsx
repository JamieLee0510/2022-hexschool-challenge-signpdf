import cancelIcon from '@assets/cancel_icon.png'
import { fabric } from 'fabric'

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

export function customFabricDeleteIcon() {
    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
        x: -0.5,
        y: -0.5,
        cursorStyle: 'pointer',
        mouseUpHandler: deleteObject,
        render: renderIcon,
    })
}
function deleteObject(event: MouseEvent, transform: fabric.Transform, x: number, y: number) {
    const { target } = transform
    const { canvas } = target
    canvas?.remove(target)
    canvas?.requestRenderAll()
    return true
}

function renderIcon(
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number,
    styleOverride: unknown,
    fabricObject: fabric.Object,
) {
    const img = document.createElement('img')
    const size = 20
    img.src = cancelIcon

    ctx.save()
    ctx.translate(left, top)
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle!))
    ctx.drawImage(img, -size / 2, -size / 2, size, size)
    ctx.restore()
}

export default customFabricDeleteIcon
