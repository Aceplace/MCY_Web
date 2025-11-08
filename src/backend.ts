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

export type BackEndConfig =
{
    basePath: string;
}

export const backEndConfig =
{
    basePath: '',
}

export async function FetchPostRequest<t_req, t_res>(endpoint: string, errorMsg: string, request: t_req): Promise<t_res>
{
    const fullRoute = backEndConfig.basePath + "/" + endpoint;

    const response = await fetch(fullRoute,
    {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });

    const networkResponse: NetworkResponse<t_res> = await response.json();

    if (!networkResponse.success)
        throw new Error('errorMsg: ' + networkResponse.message);

    return networkResponse.data!;
}

export async function SimpleGetRequest<t_res>(endpoint: string, errorMsg: string): Promise<t_res>
{
    const fullRoute = backEndConfig.basePath + "/" + endpoint;

    const response = await fetch('/api/studentProgress/getAllStudentProgress',
    {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const networkResponse: NetworkResponse<t_res> = await response.json();

    if (!networkResponse.success)
        throw new Error('errorMsg: ' + networkResponse.message);

    return networkResponse.data!;
}



