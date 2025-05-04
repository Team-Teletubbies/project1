import express from 'express';
import { defaultNotFoundHandler, globalErrorHandler } from './controllers/errorController';

const app: express.Application = express();
app.use(express.json());

app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
