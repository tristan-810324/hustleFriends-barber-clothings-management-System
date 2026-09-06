import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config.js';
import { authRouter } from './auth.routes.js';

const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    const isConfiguredOrigin = origin === config.FRONTEND_URL;
    const isLocalViteOrigin = !process.env.NODE_ENV || process.env.NODE_ENV !== 'production'
      ? /^http:\/\/(localhost|127\.0\.0\.1):517[3-9]$/.test(origin ?? '')
      : false;
    callback(null, isConfiguredOrigin || isLocalViteOrigin);
  },
  credentials: true
}));
app.use(express.json({ limit: '20kb' }));
app.use(cookieParser());
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 50, standardHeaders: true, legacyHeaders: false }), authRouter);
app.get('/health', (_request, response) => response.json({ status: 'ok' }));
app.use((_request, response) => response.status(404).json({ error: 'Not found' }));
app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error instanceof Error ? error.message : 'Unhandled server error');
  response.status(500).json({ error: 'Internal server error' });
});

app.listen(config.PORT, () => {
  console.log(`Hustle Friends API listening on port ${config.PORT}`);
});
