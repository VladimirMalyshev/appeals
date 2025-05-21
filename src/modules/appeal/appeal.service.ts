import { appealRepository } from './appeal.repository';

export const appealService = {
  createAppeal: (title: string, message: string, userId: number) => {
    return appealRepository.create({ title, message, userId });
  },

  startProcessing: (id: number) => {
    return appealRepository.updateStatus(id, 'IN_PROGRESS');
  },

  completeAppeal: (id: number, resolution: string) => {
    return appealRepository.complete(id, resolution);
  },

  cancelAppeal: (id: number, reason: string) => {
    return appealRepository.cancel(id, reason);
  },

  getAppeals: (filters: { date?: string; from?: string; to?: string }) => {
    return appealRepository.findAll(filters);
  },

  cancelAllInProgress: () => {
    return appealRepository.cancelAllInProgress();
  },
};
