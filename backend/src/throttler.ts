import { ThrottlerException, ThrottlerGuard } from "@nestjs/throttler";

export class Throttler extends ThrottlerGuard {
    protected throwThrottlingException(): void {
        throw new ThrottlerException("Rate limit exceeded");
    }
}