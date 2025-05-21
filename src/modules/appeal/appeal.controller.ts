import { Request, Response } from 'express';
import { appealService } from './appeal.service';
import { AuthenticatedRequest, UserPayload } from '../auth/auth.middleware';

export const getAppeals = async (req: Request, res: Response) => {
  const { date, from, to } = req.query;
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date as string)) {
    res.status(400).json({ error: 'Поле date должно быть в формате YYYY-MM-DD' });
    return;
  }
  if (from && !/^\d{4}-\d{2}-\d{2}$/.test(from as string)) {
    res.status(400).json({ error: 'Поле from должно быть в формате YYYY-MM-DD' });
    return;
  }
  if (to && !/^\d{4}-\d{2}-\d{2}$/.test(to as string)) {
    res.status(400).json({ error: 'Поле to должно быть в формате YYYY-MM-DD' });
    return;
  }
  const results = await appealService.getAppeals({
    date: date as string,
    from: from as string,
    to: to as string,
  });
  res.json(results);
};

export const getMyAppeals = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user as UserPayload;
  const results = await appealService.getAppeals({ userId: parseInt(user.id) });
  res.json(results);
};

export const createAppeal = async (req: AuthenticatedRequest, res: Response) => {
  const { title, message } = req.body;
  if (typeof title !== 'string' || title.trim() === '') {
    res.status(400).json({ error: 'Поле title обязательно и должно быть строкой' });
    return;
  }

  if (typeof message !== 'string' || message.trim() === '') {
    res.status(400).json({ error: 'Поле message обязательно и должно быть строкой' });
    return;
  }

  const user = req.user as UserPayload;
  const result = await appealService.createAppeal(title, message, parseInt(user.id));
  res.status(201).json(result);
};

export const startProcessing = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid ID' });
    return;
  }
  const result = await appealService.startProcessing(id);
  res.json(result);
};

export const completeAppeal = async (req: Request, res: Response) => {
  const { resolution } = req.body;
  const id = parseInt(req.params.id, 10);
  if (typeof resolution !== 'string' || resolution.trim() === '') {
    res.status(400).json({ error: 'Поле resolution обязательно и должно быть строкой' });
    return;
  }
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid ID' });
    return;
  }
  const result = await appealService.completeAppeal(id, resolution);
  res.json(result);
};

export const cancelAppeal = async (req: Request, res: Response) => {
  const { reason } = req.body;
  const id = parseInt(req.params.id, 10);
  if (typeof reason !== 'string' || reason.trim() === '') {
    res.status(400).json({ error: 'Поле reason обязательно и должно быть строкой' });
    return;
  }
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid ID' });
    return;
  }
  const result = await appealService.cancelAppeal(id, reason);
  res.json(result);
};

export const canselAllInProgress = async (_req: Request, res: Response) => {
  const result = await appealService.cancelAllInProgress();
  res.json(result);
};
