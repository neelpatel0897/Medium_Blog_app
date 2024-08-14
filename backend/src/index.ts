import { Hono } from 'hono'


import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';

interface Env {
  DATABASE_URL: string;
  JWT_SECRET: string;
}

const app = new Hono<{
  Bindings: Env,
  Variables: {},
}>();


app.route("api/v1/user", userRouter);
app.route("api/v1/blog", blogRouter);

app.get('/', (c) => {
  
  return c.text('Hello Hono!')
})



export default app


