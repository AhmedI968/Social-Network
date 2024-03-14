import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient() // access to the Prisma client

async function main() { // async = run, wait, run, wait, etc.
    /// ... your Prisma Client queries will go here
    // const user = await prisma.user.createMany({
    //     data: [
    //         { name: 'kamran L', password: 'password', email: 'email', last_active: new Date(), created_at: new Date(), updated_at: new Date(), location: 'location', age: 20 },
    //         { name: 'chef paul', password: 'password', email: 'thelanding', last_active: new Date(), created_at: new Date(), updated_at: new Date(), location: 'location', age: 20 },
    //     ]
    // })
    // example query to create new user
    const findUser = await prisma.user.findMany() // example query to find all users
    console.log(findUser)
    // const removeUser = await prisma.user.delete({
    //     where: {
    //         user_id: 4
    //     }
    // }) // example query to delete user
    // console.log(user)
    // console.log("Just deleted user ", removeUser)
    // console.log(findUser)
    // await prisma.user.deleteMany() // delete all users
}


main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect() // end of code, disconnect from the database
    })
