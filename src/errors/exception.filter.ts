import { Request, Response, NextFunction } from "express";
import { IExceptionFilter } from "./excepiton.filter.interface";
import { HTTPError } from "./custom/http-error";
import { logger } from "../common/logger/logger.service";
import { CORSError } from "./custom/cors-error";
import { NotFoundError } from "./custom/not-found-error";

export class ExceptionFilter implements IExceptionFilter {

    catch(error: Error, req: Request, res: Response, next: NextFunction): void {

        if (error instanceof HTTPError) {
            logger.err(`[${error.code}] - ${error.message}`)
            res.status(error.code).send(JSON.parse(error.message))
        }
    
        if (error instanceof CORSError) {
            logger.err(`CORS Error. Host: ${error.origin}. \n${error.message}`)
            res.status(403).send("Not allowed by CORS")
        }

        if (error instanceof NotFoundError) {
            logger.err(`path ${req.path} not found!`)
            res.status(404).send(`path ${req.path} not found!`)
        }

    };
}