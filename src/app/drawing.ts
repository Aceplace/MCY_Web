import {V2} from "../core/math";

export enum RectAlign
{
    NONE,
    LEFT_BOTTOM,
    LEFT_MIDDLE,
    LEFT_TOP,
    CENTER_TOP,
    CENTER_BOTTOM,
    RIGHT_BOTTOM,
    RIGHT_MIDDLE,
    RIGHT_TOP,
    CENTER_MIDDLE

}

export type Rect =
{
    x: number;
    y: number;
    w: number;
    h: number;
    align: RectAlign;
}

export function RectClone(rect: Rect): Rect
{
    let result: Rect = {
        x: rect.x,
        y: rect.y,
        w: rect.w,
        h: rect.h,
        align: rect.align,
    }

    return result;
}

export function RectCloneWithPos(rect: Rect, x: number, y: number): Rect
{
    let result: Rect = {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        align: rect.align,
    }

    return result;
}

export function DrawRect(ctx: CanvasRenderingContext2D, rect: Rect): void
{
    const adjustedRect = RectNormalizded(rect);
    ctx.fillRect(adjustedRect.x, adjustedRect.y, adjustedRect.w, adjustedRect.h);
}

export function RectNormalizded(rect: Rect) : Rect
{
    let result = RectClone(rect);
    switch (result.align)
    {
        case RectAlign.NONE:
            break;
        case RectAlign.LEFT_BOTTOM:
            rect.y -= rect.h;
            break;
        case RectAlign.LEFT_MIDDLE:
            rect.y -= rect.h / 2;
            break;
        case RectAlign.LEFT_TOP:
            break;
        case RectAlign.CENTER_TOP:
            rect.x -= rect.w / 2;
            break;
        case RectAlign.CENTER_BOTTOM:
            rect.x -= rect.w / 2;
            rect.y -= rect.h;
            break;
        case RectAlign.RIGHT_BOTTOM:
            rect.x -= rect.w;
            rect.y -= rect.h;
            break;
        case RectAlign.RIGHT_MIDDLE:
            rect.x -= rect.w;
            rect.y -= rect.h / 2;
            break;
        case RectAlign.RIGHT_TOP:
            rect.x -= rect.w;
            break;
        case RectAlign.CENTER_MIDDLE:
            rect.x -= rect.w / 2;
            rect.y -= rect.h / 2;
            break;
    }
    rect.align = RectAlign.LEFT_TOP;
    return result;
}

export function PositionInRectBounds(pos: V2, rect: Rect): boolean
{
    let result = pos.x >= rect.x && pos.x <= rect.x + rect.x
        && pos.y >= rect.y && pos.y <= rect.y + rect.y;
    return result;
}

export function DebugDrawBoundingBoxInRecursion(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, level: number, showLevel0: boolean = true)
{
    if (level == 0 && !showLevel0)
        return;

    ctx.save();
    if (level == 0)
        ctx.strokeStyle = "red";
    else if (level == 1)
        ctx.strokeStyle = "orange";
    else if (level == 1)
        ctx.strokeStyle = "blue";
    else if (level == 1)
        ctx.strokeStyle = "green";
    else
        ctx.strokeStyle = "purple";

    ctx.strokeRect(x, y, w, h);
    ctx.restore();
}

export function DebugDrawBounds(ctx: CanvasRenderingContext2D, bounds: Rect, color: string)
{
    ctx.save();
    ctx.strokeStyle = color;

    ctx.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);
    ctx.restore();
}

export function DrawLineV2(ctx: CanvasRenderingContext2D, startPos: V2, endPos: V2)
{
    ctx.beginPath(); // Start a new path
    ctx.moveTo(startPos.x, startPos.y);
    ctx.lineTo(endPos.x, endPos.y);
    ctx.stroke();
}

export function DrawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, lineWidth: number)
{
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.beginPath(); // Start a new path
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
}

export function FillBoundingRect(ctx: CanvasRenderingContext2D, bounds: Rect, color: string)
{
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(bounds.x, bounds.y, bounds.x, bounds.y);
    ctx.restore();
}

export function DrawLineArrow(
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    headLength: number,
    thickness: number
): void
{
    // Calculate angle of the line
    const dx = x2 - x1;
    const dy = y2 - y1;
    const angle = Math.atan2(dy, dx);

    // Save current context so we don't accidentally affect other drawings
    ctx.save();

    // Set line style
    ctx.lineWidth = thickness;
    // ctx.lineJoin = 'round';
    // ctx.lineCap = 'round';

    // Draw main line
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Draw arrowhead
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(
        x2 - headLength * Math.cos(angle - Math.PI / 6),
        y2 - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
        x2 - headLength * Math.cos(angle + Math.PI / 6),
        y2 - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.lineTo(x2, y2); // Close back to the tip
    ctx.stroke();
    ctx.fill();

    ctx.restore();
}

export class DrawingException extends Error
{
    constructor(message: string) {
        super(message);
        this.name = "DrawException";
    }
}