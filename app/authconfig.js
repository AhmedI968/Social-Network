export const authConfig = {
    providers: [],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        authorized({ auth, request }) {
            const isLoggedIn = auth?.user
            const isOnWelcomePage = request.nextUrl.pathname.startsWith("/welcome")
            if (isOnWelcomePage) {
                if (isLoggedIn) {
                    return true
                }
                return false
            }

            else if (isLoggedIn) {
                return Response.redirect(new URL("/welcome", request.nextUrl));
            }

            return true;
        }
    }
}