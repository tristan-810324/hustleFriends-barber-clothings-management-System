import { Router } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { authMiddleware, roleMiddleware } from './auth.middleware.js';
import * as ownerService from './owner.service.js';
import { createStaffSchema, resetStaffPasswordSchema } from './validators.js';

export const ownerRouter = Router();
ownerRouter.use(authMiddleware, roleMiddleware('OWNER'));

function handleError(error: unknown, response: import('express').Response) {
  if (error instanceof ZodError) return response.status(400).json({ error: 'Invalid request' });
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
    return response.status(409).json({ error: 'An account with this email already exists.' });
  }
  return response.status(500).json({ error: 'Internal server error' });
}

ownerRouter.get('/staff', async (_request, response) => {
  try { return response.json({ staff: await ownerService.listStaff() }); }
  catch (error) { return handleError(error, response); }
});

ownerRouter.post('/staff', async (request, response) => {
  try {
    const staff = await ownerService.createStaff(createStaffSchema.parse(request.body));
    return response.status(201).json({ status: 'success', message: 'Staff account created successfully', data: staff });
  } catch (error) { return handleError(error, response); }
});

ownerRouter.patch('/staff/:id/reset-password', async (request, response) => {
  try {
    const { newPassword } = resetStaffPasswordSchema.parse(request.body);
    const updated = await ownerService.resetStaffPassword(request.params.id, newPassword);
    if (!updated) return response.status(404).json({ error: 'Staff account not found' });
    return response.json({ status: 'success', message: 'Staff password updated successfully by Owner' });
  } catch (error) { return handleError(error, response); }
});