import express from "express";
import axios from 'axios';
import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import { prisma } from "./lib/prisma"
import { CreateUserSchema, CreateAvatarSchema } from "./types";



const app = express();
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const PORT = 8080;



app.use(express.json());

//home route
app.get("/", (req, res) => {
    res.send("this is home route");
    return;
})




//Post request

app.post("api/vi/signup", async (req, res) => {

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
    res.json({});

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

    const base64Image = await axios
        .get(data.image, {
            responseType: 'arraybuffer'
        })
        .then(response => Buffer.from(response.data, 'binary').toString('base64'))


    const prompt = [
        {
            text: "Create a left side  profile for this user.Give the image , create a profile from left side of this user."
        },
        {
            inlineData: {
                mimeType: "image/png",
                data: base64Image,
            },
        },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-image",
        contents: prompt,
    });

    const parts = response.candidates?.[0]?.content?.parts!;
    for (const part of parts) {
        if (part.text) {
            console.log(part.text);
        } else if (part.inlineData?.data) {
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64");
            fs.writeFileSync("./assets/gemini-native-image.png", buffer);
            console.log("Image saved as gemini-native-image.png");
        }
    }




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
    res.json({});

})

app.get("/api/v1/me", async (req, res) => {
    res.json({});

})






app.listen(PORT, () => {
    console.log(`server is listening at port no:${PORT}`);
})