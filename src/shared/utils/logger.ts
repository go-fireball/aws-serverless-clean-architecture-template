import pino from 'pino';

export const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    base: undefined,
    timestamp: pino.stdTimeFunctions.isoTime,
});

/**
 * Create a child logger that attaches AWS request context.
 */
export function withLambdaContext(context: { awsRequestId: string }) {
    return logger.child({ awsRequestId: context.awsRequestId });
}
