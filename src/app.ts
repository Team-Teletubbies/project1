import express from 'express';
import { defaultNotFoundHandler, globalErrorHandler } from './controllers/errorController';
import { authRouter } from './routers/authRouter';
import memberRouter from './routers/memberRouter';
import { PORT } from './lib/constants';

const app: express.Application = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use('/email', memberRouter);

app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
