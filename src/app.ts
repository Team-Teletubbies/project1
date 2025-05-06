import express from 'express';
import { defaultNotFoundHandler, globalErrorHandler } from './controllers/errorController';
import { authRouter } from './routers/authRouter';
import memberRouter from './routers/memberRouter';

const app: express.Application = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use('/email', memberRouter);

app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
