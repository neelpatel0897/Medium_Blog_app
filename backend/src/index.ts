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

// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZDNkNjU1YTEtNmJmYS00MmZiLThiMWYtNGMyZjE2MzUwNjdmIiwidGVuYW50X2lkIjoiOTFlM2U2ODA0ODZiZDI2ZWU3ZjJiYjAwNWQyZmE3OTkwNmQ4ZDA1NTIwMTY4Y2M0OTUwMjhiNDFjZDdlNTNlYiIsImludGVybmFsX3NlY3JldCI6IjRlZDZiOGMyLTZlMmUtNDg0OC05Mjg4LWI3M2NjNzI0MDBlMiJ9.XdrRC8rtUEwgX9r3YrISGOCdjIq2HgbXoOCVKiCi2fU"
