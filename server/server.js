const express = require('express');
require('dotenv').config();

const app = express();
const PORT = 1212;

const toolRouter = require('./routers/toolRouter.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/tool', toolRouter);

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

module.exports = app;
