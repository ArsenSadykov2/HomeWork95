import {NextFunction, Request, Response} from "express";
import {RequestWithUser} from "./auth";

const permit =  (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as RequestWithUser).user;
        if(user && !roles.includes(user.role)) {
            return res.status(403).send({error: 'You do not have permission'});
        }

        next();
    };
}

export default permit;