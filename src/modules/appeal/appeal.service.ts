export const appealService = {
  getAppeals: () => {
    return { appeals: 'all' };
  },

  createAppeal: (topic: string, message: string) => {
    return { message: message };
  },

  startProcessing: (id: string) => {
    return { id: id };
  },

  completeAppeal: (id: string, resolution: string) => {
    return { res: resolution };
  },

  cancelAppeal: (id: string, reason: string) => {
    return { res: reason };
  },

  cancelAllInProgress: () => {
    return { message: 'canseled' };
  },
};
