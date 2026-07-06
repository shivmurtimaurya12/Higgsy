import express from "express";
import { prisma } from "./lib/prisma"
import { CreateUserSchema, CreateAvatarSchema } from "./types";
import createAvatar from './image'
import cors from 'cors';


const app = express();
const PORT = 8080;
app.use(cors());


app.use(express.json());

//AUTH

//Post request

app.post("/api/v1/signup", async (req, res) => {

    //data validation using zod 
    const { success, data } = CreateUserSchema.safeParse(req.body);

    if (!success) {
        res.status(411).json({
            message: "incorrect credentials"
        })
        return;

    }

    const User = await prisma.user.create({
        data: {
            username: req.body.username,
            password: req.body.password
        }

    })
    res.json({
        id: User.id,
        username: User.username,
        password: User.password
    });
})

//Singin left for later
app.post("/api/v1/signin", async (req, res) => {
    const { success, data } = CreateUserSchema.safeParse(req.body);

    if (!success) {
        res.status(411).json({
            message: "incorrect credentials"
        })
        return;
    }
    const { username, password } = data;
    const User = await prisma.user.findUnique({
        where: {
            username, password
        }
    });

    if (!User) {
        return res.json({ msg: "enter correct username or passord !" });
    }

    res.json({ User });

})




//Avatar creation
app.post("/api/v1/avatar", async (req, res) => {

    //data validation using zod  
    const { success, data } = CreateAvatarSchema.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "incorrect"
        })
        return;
    }

    // await Promise.all([
    //       createAvatar("left side profile face")
    // ])
    await prisma.avatar.create({
        data: {
            userId: "1",
            name: data.name
        }
    })




    res.json({ msg: "done !" });

})



// Post  Video Creation
app.post("/api/v1/video", async (req, res) => {
    res.json({});

})


//get request
app.get("/api/v1/video/:videoId", async (req, res) => {
    res.json({});

})


app.get("/api/v1/videos", async (req, res) => {
    res.json({});

})


app.get("/api/v1/credits", async (req, res) => {
    res.json({});

})

app.get("/api/v1/models", async (req, res) => {
    res.json({});

})


app.get("/api/v1/avatar/:avatarId", async (req, res) => {
    res.json({});

})


//getting avatars GET request
app.get("/api/v1/avatars", async (req, res) => {

    const avatars = await prisma.avatar.findMany({
        where: {
            userId: "1"
        }
    })
    return res.json({ avatars });

})

app.get("/api/v1/me", async (req, res) => {
    res.json({});

})






app.listen(PORT, () => {
    console.log(`server is listening at port no:${PORT}`);
})