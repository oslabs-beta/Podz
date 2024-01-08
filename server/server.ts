import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = 3000;

const toolRouter = require('./routers/toolRouter.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

interface ServerError {
  log: string;
  status: number;
  message: { err: string };
}

app.use('/tool', toolRouter);

app.use((req: Request, res: Response) =>
  res.status(404).send('Page Not Found')
);

app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const defaultErr: ServerError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
