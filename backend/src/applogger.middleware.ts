import { Injectable, NestMiddleware } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

@Injectable()
export class RequestLogger implements NestMiddleware {
    async use(request: Request, response: Response, next: NextFunction): Promise<void> {
        const startAt = process.hrtime();
        const { ip, method, originalUrl } = request;
        const userAgent = request.get('user-agent') || '';

        response.on('finish', async () => {
            const { statusCode } = response;
            const contentLength = Number(response.get('content-length'));
            const diff = process.hrtime(startAt);
            const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;

            await prisma.requestLog.create({
                data: {
                    ip,
                    method,
                    path: originalUrl,
                    status: statusCode,
                    contentLength,
                    userAgent,
                    responseTime,
                },
            })
        });
        next();
    }
}