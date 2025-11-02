import express from 'express';

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


import mongoose from "mongoose";

export interface BaseUser {
    username: string;
    passwordHash: string;
    hasSetPassword: boolean;
    email: string;
    firstName: string;
    lastName: string;
    roles?: string[];       // Optional for role-based access
}
