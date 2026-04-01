import jwt from "jsonwebtoken";

export const createAccessTokenAndSetToCookies = (id, role, res) => {
    const accessToken = jwt.sign(
        { id, role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return accessToken;
};