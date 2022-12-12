import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

const init = () => {
    Sentry.init({
        dsn: "https://31ff85e231c14c9f920a61930e662f41@o1419404.ingest.sentry.io/6766379",
        integrations: [new BrowserTracing()],
        tracesSampleRate: 1.0
    });
};

const log = (error) => Sentry.captureException(error);

export const logger = { init, log };
