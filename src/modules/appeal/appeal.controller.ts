import { Request, Response } from 'express';
import { appealService } from './appeal.service';
import {
  AppealQueryParamsDTO,
  CancelAppealDto,
  CompleteAppealDto,
  CreateAppealDto,
} from './dto/appeal.dto';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
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
  const result = await appealService.startProcessing(parseInt(req.params.id));
  res.json(result);
};

export const completeAppeal = async (req: Request<{}, {}, CompleteAppealDto, {}>, res: Response) => {
  const { resolution } = req.body;
  const result = await appealService.completeAppeal(req.params.id, resolution);
  res.json(result);
};

export const cancelAppeal = async (req: Request<{}, {}, CancelAppealDto, {}>, res: Response) => {
  const { reason } = req.body;
  const result = await appealService.cancelAppeal(req.params.id, reason);
  res.json(result);
};

export const canselAllInProgress = async (_req: Request, res: Response) => {
  const result = await appealService.cancelAllInProgress();
  res.json(result);
};
