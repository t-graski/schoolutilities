import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";


const prisma = new PrismaClient();

@Injectable()
export class RequestLogger implements NestMiddleware {
    private logger = new Logger('HTTP');

    async use(request: Request, response: Response, next: NextFunction): Promise<void> {
        const startAt = process.hrtime();
        const { ip, method, originalUrl } = request;
        const userAgent = request.get('user-agent') || '';

        response.on('finish', async () => {
            const { statusCode } = response;
            const contentLength = response.get('content-length');
            const diff = process.hrtime(startAt);
            const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;

            await prisma.requestLog.create({
                data: {
                    ip: ip,
                    method,
                    path: originalUrl,
                    status: statusCode,
                    contentLength: Number(contentLength),
                    userAgent,
                    responseTime,
                },
            })
        });
        next();
    }
}