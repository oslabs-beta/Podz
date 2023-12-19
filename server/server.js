import express from 'express'
import toolRouter from './routers/toolRouter.js'
const app = express();
const PORT = 1212;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', toolRouter);

app.get('/assets/:pic', (req, res) => {
  console.log(req.params.pic);
  res.sendFile(path.resolve(__dirname, `../client/assets/${req.params.pic}`))
});

app.use((req, res) => res.status(404).send('Page Not Found'));

app.use((err, req, res, next) => {
  const defaultErr = {
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

export default app;
