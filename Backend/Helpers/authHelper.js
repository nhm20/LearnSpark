

export const generateJWTtoken =  (user) => {
    try {
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        return token;

    }
    catch (error) {
        console.error("Error generating JWT token:", error.message);
        throw new Error("Token generation failed");
    }
};
