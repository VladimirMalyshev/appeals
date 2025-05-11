import { Request, Response } from 'express';
import { appealService } from './appeal.service';

export const createAppeal = async (req: Request, res: Response) => {
  const { topic, message } = req.body;
  const result = await appealService.createAppeal(topic, message);
  res.status(201).json(result);
};

export const startProcessing = async (req: Request, res: Response) => {
  const result = await appealService.startProcessing(parseInt(req.params.id));
  res.json(result);
};

export const completeAppeal = async (req: Request, res: Response) => {
  const { resolution } = req.body;
  const result = await appealService.completeAppeal(parseInt(req.params.id), resolution);
  res.json(result);
};

export const cancelAppeal = async (req: Request, res: Response) => {
  const { reason } = req.body;
  const result = await appealService.cancelAppeal(parseInt(req.params.id), reason);
  res.json(result);
};

export const canselAllInProgress = async (_req: Request, res: Response) => {
  const result = await appealService.cancelAllInProgress();
  res.json(result);
};
