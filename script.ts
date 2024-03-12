import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient() // access to the Prisma client

async function main() {
    /// ... your Prisma Client queries will go here

}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
