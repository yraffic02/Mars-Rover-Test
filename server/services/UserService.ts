import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const UserService = {
    getUser: async (username: string) => {
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })

        return user;
    },
    create: async (username: string) => {
        const user = await prisma.user.create({
            data:{
                username
            }
        })

        return user;
    },
}