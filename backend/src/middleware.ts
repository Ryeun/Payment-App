import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import "dotenv/config"

const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization
    if(!header || !header.startsWith('Bearer ')){
        res.status(403).json({message: "no token"});
        return;
    }
    const token = header.split(" ")[1];

    try{
        const decoded = jwt.verify(token!, process.env.JWT_PASS!) as jwt.JwtPayload & { id: string }
        req.userId = decoded.id;
        next();
    }
    catch(err){
        res.status(403).json({message: "Incorrect Credentials"});
        return;
    }
}

export default userMiddleware;
