export type LogRequest = {
    logRequestIpAddress: string;
    logRequestTimestamp: Date;
    logRequestMethod: string;
    logRequestPath: string;
    logRequestStatusCode: number;
    logRequestContentLength: number;
    logRequestUserAgent: string;
    logRequestResponseTime: number;
}