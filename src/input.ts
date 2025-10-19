import {V2} from "./math";

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

const KeyKeyCodeMap =
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

class InputClass
{
    keysDown: Set<string> = new Set();
    keysDownThisFrame: Array<string> = [];
    keysUpThisFrame: Set<string> = new Set();
    mouseDown = false;
    mouseDownThisFrame = false;
    mouseUpThisFrame = false;
    mouseX: number = 0;
    mouseY: number = 0;

    constructor(target: HTMLElement | Window = window)
    {
        target.addEventListener("keydown", (e: Event) =>
        {
            const keyboardEvent: KeyboardEvent = e as KeyboardEvent;

            if (keyboardEvent.key === 'Tab') {
                keyboardEvent.preventDefault();  // Stops default tabbing behavior
            }

            if (!keyboardEvent.repeat)
            {
                const key = keyboardEvent.key;
                this.keysDownThisFrame.push(key);
                this.keysDown.add(key);
            }
        });

        target.addEventListener("keyup", (e: Event) =>
        {
            const key = (e as KeyboardEvent).key;
            this.keysDown.delete(key);
            this.keysUpThisFrame.add(key);
        });

        target.addEventListener("mousedown", (e: Event) =>
        {
            const mouseEvent = e as MouseEvent;
            if (mouseEvent.button === 0 && !this.mouseDown)
            {
                this.mouseDown = true;
                this.mouseDownThisFrame = true;
            }
        });

        target.addEventListener("mouseup", (e: Event) =>
        {
            const mouseEvent = e as MouseEvent;
            if (mouseEvent.button === 0)
            {
                this.mouseDown = false;
                this.mouseUpThisFrame = true;
            }
        });

        target.addEventListener('mousemove', (e) =>
        {
            const mouseEvent = e as MouseEvent;
            this.mouseX = mouseEvent.clientX;
            this.mouseY = mouseEvent.clientY;
        });
    }

    ClearThisFramePresses(): void
    {
        this.keysDownThisFrame = [];
        this.keysUpThisFrame.clear();
        this.mouseDownThisFrame = false;
        this.mouseUpThisFrame = false;
    }

    KeyDown(key: KeyCode): boolean
    {
        return this.keysDown.has(key);
    }

    KeyDownThisFrame(key: KeyCode): boolean
    {
        return this.keysDownThisFrame.includes(key);
    }

    KeyUpThisFrame(key: KeyCode): boolean
    {
        return this.keysUpThisFrame.has(key);
    }

    MouseDown(): boolean
    {
        return this.mouseDown;
    }

    MouseDownThisFrame(): boolean
    {
        return this.mouseDownThisFrame;
    }

    MouseUpThisFrame(): boolean
    {
        return this.mouseUpThisFrame;
    }

    MousePosInCanvas(canvas: HTMLCanvasElement): V2
    {
        const canvasRect = canvas.getBoundingClientRect();

        const canvasMouseX: number = this.mouseX - canvasRect.left;
        const canvasMouseY: number = this.mouseY - canvasRect.top;

        return { x: canvasMouseX, y: canvasMouseY };
    }
}

export const Input = new InputClass();
