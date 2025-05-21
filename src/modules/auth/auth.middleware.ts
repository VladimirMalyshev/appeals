import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const token = auth.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
      id: number;
      role: string;
      name: string;
    };
    (req as any).user = decoded;
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
}

export function authorize(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    next();
  };
}
