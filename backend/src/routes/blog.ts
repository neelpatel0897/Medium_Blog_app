import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";


interface Env {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }

export const blogRouter = new Hono<{
    Bindings: Env,
    Variables: {
        userId: string;
    },
  }>();

blogRouter.use("/*", async (c,next) => {
    // extract the user id
    // pass it down to the route handler
    console.log("middleware");
    const authHeader = c.req.header("Authorization") || "";

    try{
        const user = await verify(authHeader, c.env.JWT_SECRET) ;
    console.log(user);
    if(user){
        c.set("userId", user.id as string);
        await next();
    }else{
        c.status(401);
        return c.json({
            message: "You are not logged in"
        })
    }
    }catch(error){
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
    

    
    
});
  

//add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany();

    return c.json({
        blogs
    })
  })

blogRouter.get('/:id', async (c) => {

    const id = c.req.param("id");
    console.log(id);
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const body = await c.req.json();
    try{
        const blog = await prisma.post.findFirst({
            where:{
                id: id
            }
        });
        return c.json({
            blog
        });
    }catch(error){
        c.status(411);
        return c.json({
            message: "error while fetching blog post"
        })
    }
   
});
  
  
  
blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
    const body = await c.req.json();
    const authorId = c.get("userId");

    const blog = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: authorId
            
        }
    })
    
    return c.json({
        id:blog.id
    })
  })
  
blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
    const body = await c.req.json();

    const blog = await prisma.post.update({
        where:{
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content,
            
            
        }
    })
    
    return c.json({
        id:blog.id
    })
    
  })