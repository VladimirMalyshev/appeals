import express from 'express';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { apiSwagger } from '../docs/appeals.swagger';

import router from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Appeals API',
    version: '1.0.0',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    ...apiSwagger,
  },
};

const specs = swaggerJSDoc({ swaggerDefinition, apis: [] });

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

export default app;
