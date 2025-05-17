/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from 'express';
import { appealService } from './appeal.service';
import {
  AppealQueryParamsDTO,
  CancelAppealDto,
  CompleteAppealDto,
  CreateAppealDto,
} from './dto/appeal.dto';

export const getAppeals = async (req: Request<{}, {}, {}, AppealQueryParamsDTO>, res: Response) => {
  const { date, from, to } = req.query;
  const results = await appealService.getAppeals({
    date: date as string,
    from: from as string,
    to: to as string,
  });
  res.json(results);
};

export const createAppeal = async (req: Request<{}, {}, CreateAppealDto, {}>, res: Response) => {
  const { title, message } = req.body;
  const result = await appealService.createAppeal(title, message);
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

export const completeAppeal = async (
  req: Request<{ id: string }, {}, CompleteAppealDto, {}>,
  res: Response
) => {
  const { resolution } = req.body;
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid ID' });
    return;
  }
  const result = await appealService.completeAppeal(id, resolution);
  res.json(result);
};

export const cancelAppeal = async (
  req: Request<{ id: string }, {}, CancelAppealDto, {}>,
  res: Response
) => {
  const { reason } = req.body;
  const id = parseInt(req.params.id, 10);
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
