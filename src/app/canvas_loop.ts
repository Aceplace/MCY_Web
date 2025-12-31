import {Input} from "./input";
import {V2ToString} from "../core/math";

// const input = new Input(canvas);
//
// function GameLoop(timestamp: number)
// {
//     // Clear the canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//
//     ctx.fillText(V2ToString(input.MousePos()), 100, 100);
//     ctx.fillText(V2ToString(input.MouseDelta()), 100, 400);
//
//     input.InputEndFrame();
//     requestAnimationFrame(GameLoop);
// }
//
// requestAnimationFrame(GameLoop);

export type CanvasLoopCallback = (time: number, dt: number, input: Input, target: HTMLCanvasElement, context: CanvasRenderingContext2D) => void;

export function CreateCanvasLoop(target: HTMLCanvasElement, callback: CanvasLoopCallback)
{
    const canvasLoopState = {
        _didFirstFrame: false,
        _previousFrameTime: 0,
        _animationFrameId: 0,
        _input: new Input(target)
    }

    const ctx = target.getContext("2d");

    function CanvasLoop(time: number)
    {
        if (!canvasLoopState._didFirstFrame)
        {
            canvasLoopState._didFirstFrame = true;
            canvasLoopState._previousFrameTime = time;
        }

        const dt = time - canvasLoopState._previousFrameTime;
        canvasLoopState._previousFrameTime = time;

        callback(time, dt, canvasLoopState._input, target, ctx!);

        canvasLoopState._input.InputEndFrame();
        canvasLoopState._animationFrameId = requestAnimationFrame(CanvasLoop);
    }

    requestAnimationFrame(CanvasLoop);

    return () => {
        cancelAnimationFrame(canvasLoopState._animationFrameId);
    }
}