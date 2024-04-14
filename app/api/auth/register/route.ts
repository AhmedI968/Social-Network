export default async function POST(request: Request) {
    try {
        const (username, password) = await request.json();
        // validate username and password
        const user = await prisma?.user.findOne({
            where: {
                username
            }
        });
        if (!user) {
            return new Response("User not found", { status: 404 });
        }
        // compare password
        if (password !== user.password) {
            return new Response("Invalid password", { status: 401 });
        }
    }
    catch (err) {
        return new Response("Error parsing request", { status: 400 });
    }

}
