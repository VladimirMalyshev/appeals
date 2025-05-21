export const apiSwagger = {
  '/api/appeals': {
    get: {
      summary: 'Получить список обращений',
      tags: ['Appeals'],
      security: [{ bearerAuth: [] }],
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
      security: [{ bearerAuth: [] }],
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

  '/api/appeals/my': {
    get: {
      summary: 'Получить обращения текущего пользователя',
      tags: ['Appeals'],
      security: [{ bearerAuth: [] }],
      responses: {
        200: { description: 'Список обращений пользователя' },
        401: { description: 'Пользователь не авторизован' },
      },
    },
  },

  '/api/appeals/{id}/start': {
    patch: {
      summary: 'Начать обработку обращения',
      tags: ['Appeals'],
      security: [{ bearerAuth: [] }],
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
      security: [{ bearerAuth: [] }],
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
      security: [{ bearerAuth: [] }],
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
      security: [{ bearerAuth: [] }],
      responses: {
        200: { description: 'Все обращения в процессе отменены' },
      },
    },
  },

  '/api/auth/register': {
    post: {
      summary: 'Регистрация пользователя',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string', format: 'email' },
                password: { type: 'string' },
                role: { type: 'string' },
                name: { type: 'string' },
              },
              required: ['email', 'password', 'role', 'name'],
            },
          },
        },
      },
      responses: {
        201: { description: 'Пользователь зарегистрирован' },
        400: { description: 'Ошибка валидации' },
      },
    },
  },

  '/api/auth/login': {
    post: {
      summary: 'Авторизация пользователя',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string' },
                password: { type: 'string' },
              },
              required: ['email', 'password'],
            },
          },
        },
      },
      responses: {
        200: { description: 'Успешный вход' },
        400: { description: 'Неверные данные' },
      },
    },
  },

  '/api/auth/refresh': {
    post: {
      summary: 'Обновить access токен',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                refreshToken: { type: 'string' },
              },
              required: ['refreshToken'],
            },
          },
        },
      },
      responses: {
        200: { description: 'Токен обновлён' },
        400: { description: 'Не передан refreshToken' },
      },
    },
  },

  '/api/auth/logout': {
    post: {
      summary: 'Выход пользователя',
      tags: ['Auth'],
      security: [{ bearerAuth: [] }],
      responses: {
        204: { description: 'Выход выполнен' },
        401: { description: 'Пользователь не авторизован' },
      },
    },
  },
};
