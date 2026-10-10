import { Router } from 'express';
import { ZodError } from 'zod';
import { prisma } from '../config/database.js';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware.js';
import { createStaffMessageSchema } from '../validators/index.js';
import { createStaffMessageReplySchema } from '../validators/index.js';
import { sendStaffReplyEmail } from '../utils/mail.js';

export const messagesRouter = Router();

messagesRouter.post('/', async (request, response) => {
  try {
    const message = await prisma.staffMessage.create({
      data: createStaffMessageSchema.parse(request.body)
    });
    return response.status(201).json({ message: { id: message.id } });
  } catch (error) {
    if (error instanceof ZodError) return response.status(400).json({ error: 'Invalid request' });
    return response.status(500).json({ error: 'Internal server error' });
  }
});

messagesRouter.get('/staff', authMiddleware, roleMiddleware('STAFF', 'OWNER'), async (_request, response) => {
  try {
    const messages = await prisma.staffMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { replies: { orderBy: { createdAt: 'asc' } } }
    });
    return response.json({ messages });
  } catch {
    return response.status(500).json({ error: 'Internal server error' });
  }
});

messagesRouter.post('/staff/:id/replies', authMiddleware, roleMiddleware('STAFF', 'OWNER'), async (request, response) => {
  try {
    const input = createStaffMessageReplySchema.parse(request.body);
    const messageId = request.params.id;
    if (typeof messageId !== 'string') return response.status(400).json({ error: 'Invalid message id' });
    const inquiry = await prisma.staffMessage.findUnique({ where: { id: messageId } });
    if (!inquiry) return response.status(404).json({ error: 'Message not found' });

    const reply = await prisma.staffMessageReply.create({
      data: { message: input.message, staffMessageId: inquiry.id }
    });

    setImmediate(() => {
      void sendStaffReplyEmail(inquiry.email, inquiry.subject, input.message).catch((error: unknown) => {
        console.error('Unable to send staff reply email:', error instanceof Error ? error.message : error);
      });
    });

    return response.status(201).json({ reply, emailStatus: 'queued' });
  } catch (error) {
    if (error instanceof ZodError) return response.status(400).json({ error: 'Invalid request' });
    if (error instanceof Error && error.message === 'Email delivery is not configured') {
      return response.status(503).json({ error: error.message });
    }
    return response.status(500).json({ error: 'Unable to send email reply' });
  }
});
