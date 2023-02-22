import {expressjwt} from "express-jwt";

export const requireSignIn = expressjwt({
    secret: "QWERTY",
    algorithms: ['HS256']
});