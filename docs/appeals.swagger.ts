export const appealSwagger = {
  '/api/appeals': {
    get: {
      summary: 'Получить список обращений',
      tags: ['Appeals'],
      parameters: [
        {
          in: 'query',
          name: 'date',
          schema: { type: 'string', format: 'date' },
          description: 'Фильтрация по дате',
        },
        {
          in: 'query',
          name: 'from',
          schema: { type: 'string', format: 'date' },
          description: 'Начальная дата диапазона',
        },
        {
          in: 'query',
          name: 'to',
          schema: { type: 'string', format: 'date' },
          description: 'Конечная дата диапазона',
        },
      ],
      responses: {
        200: {
          description: 'Список обращений',
        },
      },
    },
    post: {
      summary: 'Создать обращение',
      tags: ['Appeals'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                message: { type: 'string' },
              },
              required: ['title', 'message'],
            },
          },
        },
      },
      responses: {
        201: { description: 'Обращение создано' },
        400: { description: 'Ошибка валидации' },
      },
    },
  },
  '/api/appeals/{id}/start': {
    patch: {
      summary: 'Начать обработку обращения',
      tags: ['Appeals'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
        },
      ],
      responses: {
        200: { description: 'Обработка начата' },
        400: { description: 'Некорректный ID' },
      },
    },
  },
  '/api/appeals/{id}/complete': {
    patch: {
      summary: 'Завершить обращение',
      tags: ['Appeals'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                resolution: { type: 'string' },
              },
              required: ['resolution'],
            },
          },
        },
      },
      responses: {
        200: { description: 'Обращение завершено' },
        400: { description: 'Ошибка запроса' },
      },
    },
  },
  '/api/appeals/{id}/cancel': {
    patch: {
      summary: 'Отменить обращение',
      tags: ['Appeals'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                reason: { type: 'string' },
              },
              required: ['reason'],
            },
          },
        },
      },
      responses: {
        200: { description: 'Обращение отменено' },
        400: { description: 'Ошибка запроса' },
      },
    },
  },
  '/api/appeals/cancel-in-progress': {
    patch: {
      summary: 'Отменить все обращения в процессе',
      tags: ['Appeals'],
      responses: {
        200: { description: 'Все обращения в процессе отменены' },
      },
    },
  },
};
