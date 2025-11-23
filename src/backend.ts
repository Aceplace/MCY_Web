import express from 'express';
import mongoose from "mongoose";
import {STATUS_CODES} from "node:http";

export enum HttpStatusCodeType
{
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
}

export type NetworkResponse<T> =
{
    statusCode: HttpStatusCodeType;
    message: string;
    data?: T;
}

export function IsSuccessCode(statusCode: HttpStatusCodeType)
{
    switch (statusCode)
    {
        case HttpStatusCodeType.OK:
        case HttpStatusCodeType.CREATED:
        case HttpStatusCodeType.NO_CONTENT:
            return true;
    }
    return false;
}

export function MakeResponse<T>(res: express.Response, statusCode: number, message: string, data?: T)
{
    res.status(statusCode).json({
        statusCode, message, data
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

export class ApiError extends Error {
    constructor(
        public status: HttpStatusCodeType,
        public message: string,
    )
    {
        super(message);
    }
}

export function BasicErrorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction)
{
    if (err instanceof ApiError)
        MakeResponse<string>(res, err.status, err.message, err.stack);
    else if (err instanceof Error)
        MakeResponse<string>(res, HttpStatusCodeType.INTERNAL_SERVER_ERROR, err.message, err.stack);
    else
        MakeResponse<string>(res, HttpStatusCodeType.INTERNAL_SERVER_ERROR, 'unknown error', err.stack);
}

export type BackEndConfig =
{
    basePath: string;
}

export const backEndConfig =
{
    basePath: '',
}

export async function FetchPostRequest<t_req, t_res>(endpoint: string, errorMsg: string, request: t_req): Promise<NetworkResponse<t_res>>
{
    const fullRoute = backEndConfig.basePath + endpoint;

    const response = await fetch(fullRoute,
    {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });

    const result: NetworkResponse<t_res> = await response.json();
    return result;
    // if (!networkResponse.success)
    //     throw new Error('errorMsg: ' + networkResponse.message);
    //
    // return networkResponse.data!;
}

export async function SimpleGetRequest<t_res>(endpoint: string, errorMsg: string): Promise<NetworkResponse<t_res>>
{
    const fullRoute = backEndConfig.basePath + endpoint;

    const response = await fetch(fullRoute,
    {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const result: NetworkResponse<t_res> = await response.json();
    return result;

    // if (!networkResponse.success)
    //     throw new Error('errorMsg: ' + networkResponse.message);

    // return networkResponse.data!;
}

export const ErrorHandlerWrapper = (fn: express.RequestHandler) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};