export const authenticate = async (formData) => {
    const { username, password } = Object.fromEntries(formData)

    try {
        await signIn("credentials", { username, password })
    }

    catch (err) {
        console.error(err)
        throw new Error("An error occurred while logging in")
    }
}