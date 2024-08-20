import { Hono } from 'hono'


import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors'

interface Env {
  DATABASE_URL: string;
  JWT_SECRET: string;
}

//hello this is uncommitted


const app = new Hono<{
  Bindings: Env,
  Variables: {},
}>();

app.use(cors({
  origin: "*", // allow all origins  
}));
app.route("api/v1/user", userRouter);
app.route("api/v1/blog", blogRouter);

app.get('/', (c) => {
  
  return c.text('Hello Hono!')
})



export default app


