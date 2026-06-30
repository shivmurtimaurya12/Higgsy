
import z from "zod";

export const CreateUserSchema = z.object({
    username: z.string(),
    password: z.string()

})

export const CreateAvatarSchema = z.object({
    name: z.string(),
    // images: z.array(z.string())
    image: z.string()

})