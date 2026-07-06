import axios from 'axios';
import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export default async function createAvatar({ title, image }: { title: string, image: string }) {

    const base64Image = await axios
        .get(image, {
            responseType: 'arraybuffer'
        })
        .then(response => Buffer.from(response.data, 'binary').toString('base64'))


    const prompt = [
        {
            text:title
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
}