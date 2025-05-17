import express from 'express';
import cors from 'cors';

import router from './routes';
import { errorHandler } from './common/middlewares/errorHandler';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(
  (
    err: any,
    req: express.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: express.Response<any, Record<string, any>>,
    next: express.NextFunction
  ) => {
    errorHandler(err, req, res, next);
  }
);

export default app;
