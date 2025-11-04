import express from 'express';
import mongoose from "mongoose";

export type NetworkResponse<T> =
{
    success: boolean;
    message: string;
    data?: T;
}

export function MakeResponse<T>(res: express.Response, statusCode: number, success: boolean, message: string, data?: T)
{
    res.status(statusCode).json({
        success, message, data
    });
}

export async function ConnectToDB(uri: string): Promise<void>
{
    try
    {
        await mongoose.connect(uri!);
        console.log("Connected to database...");
    }
    catch(err)
    {
        console.error("Database connection error:", err);
    }
}

export function BasicErrorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction)
{
    if (err instanceof Error)
    {
        // res.status(400).json({ message: err.message, callStack: err.stack });
        MakeResponse<string>(res, 400, false, err.message, err.stack);
    }
    else
    {
        // res.status(400).json({ message: 'unknown error', callStack: err.stack });
        MakeResponse<string>(res, 400, false, 'unknown error', err.stack);
    }
}
