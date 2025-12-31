// noinspection JSUnusedGlobalSymbols

import {V2} from "../core/math";

export enum KeyCode
{
    A = "a",
    B = "b",
    C = "c",
    D = "d",
    E = "e",
    F = "f",
    G = "g",
    H = "h",
    I = "i",
    J = "j",
    K = "k",
    L = "l",
    M = "m",
    N = "n",
    O = "o",
    P = "p",
    Q = "q",
    R = "r",
    S = "s",
    T = "t",
    U = "u",
    V = "v",
    W = "w",
    X = "x",
    Y = "y",
    Z = "z",
    Digit0 = "0",
    Digit1 = "1",
    Digit2 = "2",
    Digit3 = "3",
    Digit4 = "4",
    Digit5 = "5",
    Digit6 = "6",
    Digit7 = "7",
    Digit8 = "8",
    Digit9 = "9",
    F1  = "F1",
    F2  = "F2",
    F3  = "F3",
    F4  = "F4",
    F5  = "F5",
    F6  = "F6",
    F7  = "F7",
    F8  = "F8",
    F9  = "F9",
    F10 = "F10",
    F11 = "F11",
    F12 = "F12",
    ArrowUp    = "ArrowUp",
    ArrowDown  = "ArrowDown",
    ArrowLeft  = "ArrowLeft",
    ArrowRight = "ArrowRight",
    ShiftLeft   = "Shift",
    ControlLeft = "Control",
    AltLeft     = "Alt",
    MetaLeft    = "Meta",
    Space     = " ",
    Enter     = "Enter",
    Escape    = "Escape",
    Tab       = "Tab",
    Backspace = "Backspace",
    MouseLeft   = "MouseLeft",
    MouseRight  = "MouseRight",
    MouseMiddle = "MouseMiddle",
    Period = ".",
    Dash = "-",
    Underscore = "_",
    Equals = "=",
    Plus = "+",
}

export const KeyKeyCodeMap =
{
    "a" : 0,
    "b" : 1,
    "c" : 2,
    "d" : 3,
    "e" : 4,
    "f" : 5,
    "g" : 6,
    "h" : 7,
    "i" : 8,
    "j" : 9,
    "k" : 10,
    "l" : 11,
    "m" : 12,
    "n" : 13,
    "o" : 14,
    "p" : 15,
    "q" : 16,
    "r" : 17,
    "s" : 18,
    "t" : 19,
    "u" : 20,
    "v" : 21,
    "w" : 22,
    "x" : 23,
    "y" : 24,
    "z" : 25,
    "0" : 26,
    "1" : 27,
    "2" : 28,
    "3" : 29,
    "4" : 30,
    "5" : 31,
    "6" : 32,
    "7" : 33,
    "8" : 34,
    "9" : 35,
    "F1" : 36,
    "F2" : 37,
    "F3" : 38,
    "F4" : 39,
    "F5" : 40,
    "F6" : 41,
    "F7" : 42,
    "F8" : 43,
    "F9" : 44,
    "F10" : 45,
    "F11" : 46,
    "F12" : 47,
    "ArrowUp" : 48,
    "ArrowDown" : 49,
    "ArrowLeft" : 50,
    "ArrowRight" : 51,
    "Shift" : 52,
    "Control" : 53,
    "Alt" : 54,
    "Meta" : 55,
    " " : 56,
    "Enter" : 57,
    "Escape" : 58,
    "Tab" : 59,
    "Backspace" : 60,
    "MouseLeft" : 61,
    "MouseRight" : 62,
    "MouseMiddle" : 63,
    ".": 64,
    "-": 65,
    "_": 66,
    "=": 67,
    "+": 68,
}

export enum MouseButton
{
    LEFT,
    MIDDLE,
    RIGHT,
}

export class Input
{
    _target: HTMLElement;
    _keysDown: Set<string> = new Set();
    _keysDownThisFrame: Array<string> = [];
    _keysUpThisFrame: Set<string> = new Set();

    _mouseDownLeft = false;
    _mouseDownThisFrameLeft = false;
    _mouseUpThisFrameLeft = false;
    _mouseDownMiddle = false;
    _mouseDownThisFrameMiddle = false;
    _mouseUpThisFrameMiddle = false;
    _mouseDownRight = false;
    _mouseDownThisFrameRight = false;

    _mouseUpThisFrameRight = false;
    _mouseX: number = 0;
    _mouseY: number = 0;
    _previousMouseX: number = 0;
    _previousMouseY: number = 0;
    _dWheel: number = 0;

    constructor(target: HTMLElement)
    {
        this._target = target;
        this._target.addEventListener("keydown", this._onKeyDown);
        this._target.addEventListener("keyup", this._onKeyUp);
        this._target.addEventListener("mousedown", this._onMouseDown);
        this._target.addEventListener("mouseup", this._onMouseUp);
        this._target.addEventListener('mousemove', this._onMouseMove);
        this._target.addEventListener('contextmenu', this._onContext);
        this._target.addEventListener('wheel', this._onWheel);
    }

    _onKeyDown = (e: Event)=>
    {
        const keyboardEvent: KeyboardEvent = e as KeyboardEvent;

        keyboardEvent.preventDefault();

        if (!keyboardEvent.repeat)
        {
            const key = keyboardEvent.key;
            this._keysDownThisFrame.push(key);
            this._keysDown.add(key);
        }
    }

    _onKeyUp = (e: Event)=>
    {
        const key = (e as KeyboardEvent).key;
        this._keysDown.delete(key);
        this._keysUpThisFrame.add(key);
    }

    _onMouseDown = (e: Event)=>
    {
        const mouseEvent = e as MouseEvent;
        if (mouseEvent.button !== 0)
        {
            e.preventDefault();
        }

        if (mouseEvent.button === 0 && !this._mouseDownLeft)
        {
            this._mouseDownLeft = true;
            this._mouseDownThisFrameLeft = true;
        }
        else if (mouseEvent.button === 1 && !this._mouseDownMiddle)
        {
            this._mouseDownMiddle = true;
            this._mouseDownThisFrameMiddle = true;
        }
        else if (mouseEvent.button === 2 && !this._mouseDownRight)
        {
            this._mouseDownRight = true;
            this._mouseDownThisFrameRight = true;
        }
    }

    _onMouseUp = (e: Event)=>
    {
        const mouseEvent = e as MouseEvent;
        if (mouseEvent.button === 0)
        {
            this._mouseDownLeft = false;
            this._mouseUpThisFrameLeft = true;
        }
        else if (mouseEvent.button === 1)
        {
            this._mouseDownMiddle = false;
            this._mouseUpThisFrameMiddle = true;
        }
        else if (mouseEvent.button === 2)
        {
            this._mouseDownRight = false;
            this._mouseUpThisFrameRight = true;
        }
    }

    _onMouseMove = (e: Event)=>
    {
        const mouseEvent = e as MouseEvent;
        this._mouseX = mouseEvent.clientX;
        this._mouseY = mouseEvent.clientY;
    }

    _onContext = (e: Event)=>
    {
        e.preventDefault();
    }

    _onWheel = (e: Event) =>
    {
        const wheelEvent = e as WheelEvent;
        this._dWheel = wheelEvent.deltaY;
    };

    InputEndFrame(): void
    {
        this._keysDownThisFrame = [];
        this._keysUpThisFrame.clear();
        this._mouseDownThisFrameLeft = false;
        this._mouseUpThisFrameLeft = false;
        this._mouseDownThisFrameMiddle = false;
        this._mouseUpThisFrameMiddle = false;
        this._mouseDownThisFrameRight = false;
        this._mouseUpThisFrameRight = false;
        this._dWheel = 0;
        this._previousMouseX = this._mouseX;
        this._previousMouseY = this._mouseY;
    }

    MouseDelta(): V2
    {
        const dx = this._mouseX - this._previousMouseX;
        const dy = this._mouseY - this._previousMouseY;
        return { x: dx, y: dy};
    }

    MouseDeltaX(): number
    {
        const dx = this._mouseX - this._previousMouseX;
        return dx;
    }

    MouseDeltaY(): number
    {
        const dy = this._mouseY - this._previousMouseY;
        return dy;
    }

    KeyDown(key: KeyCode): boolean
    {
        return this._keysDown.has(key);
    }

    KeyDownThisFrame(key: KeyCode): boolean
    {
        return this._keysDownThisFrame.includes(key);
    }

    KeyUpThisFrame(key: KeyCode): boolean
    {
        return this._keysUpThisFrame.has(key);
    }

    MouseDown(mouseButton: MouseButton): boolean
    {
        if (mouseButton == MouseButton.LEFT)
            return this._mouseDownLeft;
        if (mouseButton == MouseButton.MIDDLE)
            return this._mouseDownMiddle;
        if (mouseButton == MouseButton.RIGHT)
            return this._mouseDownRight;
        return false;
    }

    MouseDownThisFrame(mouseButton: MouseButton): boolean
    {
        if (mouseButton == MouseButton.LEFT)
            return this._mouseDownThisFrameLeft;
        if (mouseButton == MouseButton.MIDDLE)
            return this._mouseDownThisFrameMiddle;
        if (mouseButton == MouseButton.RIGHT)
            return this._mouseDownThisFrameRight;
        return false;
    }

    MouseUpThisFrame(mouseButton: MouseButton): boolean
    {
        if (mouseButton == MouseButton.LEFT)
            return this._mouseUpThisFrameLeft;
        if (mouseButton == MouseButton.MIDDLE)
            return this._mouseUpThisFrameMiddle;
        if (mouseButton == MouseButton.RIGHT)
            return this._mouseUpThisFrameRight;
        return false;
    }

    MousePos(): V2
    {
        const elementRect = this._target.getBoundingClientRect();

        const elementMouseX: number = this._mouseX - elementRect.left;
        const elementMouseY: number = this._mouseY - elementRect.top;

        return { x: elementMouseX, y: elementMouseY };
    }

    Destroy()
    {
        this._target.removeEventListener("keydown", this._onKeyDown);
        this._target.removeEventListener("keyup", this._onKeyUp);
        this._target.removeEventListener("mousedown", this._onMouseDown);
        this._target.removeEventListener("mouseup", this._onMouseUp);
        this._target.removeEventListener("mousemove", this._onMouseMove);
        this._target.removeEventListener('contextmenu', this._onContext);
        this._target.removeEventListener('wheel', this._onContext);

        this._keysDown.clear();
        this._keysDownThisFrame.length = 0;
        this._keysUpThisFrame.clear();
        this._mouseDownLeft = false;
        this._mouseDownThisFrameLeft = false;
        this._mouseUpThisFrameLeft = false;
        this._mouseDownMiddle = false;
        this._mouseDownThisFrameMiddle = false;
        this._mouseUpThisFrameMiddle = false;
        this._mouseDownRight = false;
        this._mouseDownThisFrameRight = false;
        this._mouseUpThisFrameRight = false;
    }
}