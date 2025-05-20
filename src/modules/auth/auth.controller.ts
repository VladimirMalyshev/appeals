import { Request, Response } from 'express';
import { authService } from './auth.service';

export const register = async (req: Request, res: Response) => {
  const { email, password, role, name } = req.body;
  if (!email || !password || !role) {
    res.status(400).json({ error: 'Missing fields' });
    return;
  }

  const result = await authService.register(email, password, role, name);
  res.status(201).json(result);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Missing credentials' });
    return;
  }

  const result = await authService.login(email, password);
  res.json(result);
};
