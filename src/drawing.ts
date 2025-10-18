import {V2} from "./math";

export class Rect
{
    pos: V2 = {x: 0, y: 0};
    dim: V2 = {x: 0, y: 0};

    clone(): Rect
    {
        let result: Rect = new Rect();

        result.pos.x = this.pos.x;
        result.pos.y = this.pos.y;
        result.dim.x = this.dim.x;
        result.dim.y = this.dim.y;

        return result;
    }

    WithPos(pos: V2): Rect
    {
        let result: Rect = new Rect();

        result.pos.x = pos.x;
        result.pos.y = pos.y;
        result.dim.x = this.dim.x;
        result.dim.y = this.dim.y;

        return result;
    }
}

export function PositionInBounds(pos: V2, bounds: Rect): boolean
{
    let result = pos.x >= bounds.pos.x && pos.x <= bounds.pos.x + bounds.dim.x
        && pos.y >= bounds.pos.y && pos.y <= bounds.pos.y + bounds.dim.y;
    return result;
}

export function DebugDrawBoundingBoxInRecursion(ctx: CanvasRenderingContext2D, pos: V2, w: number, h: number, level: number, showLevel0: boolean = true)
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

    ctx.strokeRect(pos.x, pos.y, w, h);
    ctx.restore();
}

export function DebugDrawBounds(ctx: CanvasRenderingContext2D, bounds: Rect, color: string)
{
    ctx.save();
    ctx.strokeStyle = color;

    ctx.strokeRect(bounds.pos.x, bounds.pos.y, bounds.dim.x, bounds.dim.y);
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
    ctx.fillRect(bounds.pos.x, bounds.pos.y, bounds.dim.x, bounds.dim.y);
    ctx.restore();
}

export function DrawParentheses(ctx: CanvasRenderingContext2D, leftBox: Rect, rightBox: Rect)
{
    const PARENTHESIS_X_OFFSET_ONE: number = 1.1;
    const PARENTHESIS_X_OFFSET_TWO: number = 1.8;
    const PARENTHESIS_X_OFFSET_THRESHOLD: number = 70;

    function drawParenthesis(x: number, y: number, width: number, height: number, direction: string)
    {
        let controlOffsetX: number = width * PARENTHESIS_X_OFFSET_ONE;
        if (height > PARENTHESIS_X_OFFSET_THRESHOLD)
            controlOffsetX = width * PARENTHESIS_X_OFFSET_TWO;
        const controlOffsetY: number = height * 0.1;

        ctx.beginPath();
        if (direction === "left") {
            ctx.moveTo(x + controlOffsetX, y);
            ctx.bezierCurveTo(
                x, y + controlOffsetY,
                x, y + height - controlOffsetY,
                x + controlOffsetX, y + height
            );
        } else {
            ctx.moveTo(x + width - controlOffsetX, y);
            ctx.bezierCurveTo(
                x + width, y + controlOffsetY,
                x + width, y + height - controlOffsetY,
                x + width - controlOffsetX, y + height
            );
        }
        ctx.stroke();
    }

    ctx.save();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    drawParenthesis(leftBox.pos.x, leftBox.pos.y, leftBox.dim.x, leftBox.dim.y, "left");
    drawParenthesis(rightBox.pos.x, rightBox.pos.y, rightBox.dim.x, rightBox.dim.y, "right");
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

