import { Status } from '@prisma/client';
import prisma from '../../database/prisma/prisma.service';

export const appealRepository = {
  create: ({ title, message, userId }: { title: string; message: string; userId: number }) => {
    return prisma.appeal.create({
      data: { title, message, user_id: userId },
    });
  },

  updateStatus: (id: number, status: Status) => {
    return prisma.appeal.update({
      where: { id },
      data: { status },
    });
  },

  complete: (id: number, resolution: string) => {
    return prisma.appeal.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        resolution,
      },
    });
  },

  cancel: (id: number, reason: string) => {
    return prisma.appeal.update({
      where: { id },
      data: {
        status: 'CANCELED',
        cancellationReason: reason,
      },
    });
  },

  findAll: (filters: { date?: string; from?: string; to?: string }) => {
    const { date, from, to } = filters;
    let where = {};

    if (date) {
      const d = new Date(date);
      where = {
        createdAt: {
          gte: new Date(d.setHours(0, 0, 0, 0)),
          lt: new Date(d.setHours(23, 59, 59, 999)),
        },
      };
    } else if (from && to) {
      where = {
        createdAt: {
          gte: new Date(from),
          lte: new Date(to),
        },
      };
    }

    return prisma.appeal.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  },

  cancelAllInProgress: () => {
    return prisma.appeal.updateMany({
      where: { status: 'IN_PROGRESS' },
      data: {
        status: 'CANCELED',
        cancellationReason: 'Отменено автоматически',
      },
    });
  },
};
