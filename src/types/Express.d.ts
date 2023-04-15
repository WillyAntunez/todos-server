
import { Request, Response, NextFunction } from "express"

export type ExpressMiddleware<T = any> = (req:Request, res:Response, next:NextFunction) => T