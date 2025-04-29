import pino from 'pino';
import tracer from 'dd-trace';

export const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    base: undefined, // Don't include pid, hostname — AWS has that
    timestamp: pino.stdTimeFunctions.isoTime,
});

/**
 * Returns a child logger with awsRequestId, trace_id, and span_id for Datadog trace-log correlation.
 */
export function getLoggerWithTraceContext(context: { awsRequestId: string }) {
    const activeSpan = tracer.scope().active();
    const traceId = activeSpan?.context()?.toTraceId?.();
    const spanId = activeSpan?.context()?.toSpanId?.();

    return logger.child({
        awsRequestId: context.awsRequestId,
        trace_id: traceId,
        span_id: spanId,
    });
}
