import { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { ValidationError } from 'class-validator';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (Array.isArray(err) && err[0] instanceof ValidationError) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: err.map((e) => ({
        property: e.property,
        constraints: e.constraints,
      })),
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).json({
      message: 'Database error',
      code: err.code,
      meta: err.meta,
    });
  }

  console.error('Unhandled Error:', err);

  return res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
}
