import { Response,Request,NextFunction } from 'express';


export default function checkOrigin(req:Request, res:Response, next:NextFunction){
    try {
        const authToken=req.headers.authorization||""
        const token = authToken.split(' ').pop()
        if (token === '') {
            next()
        } else {
            res.status(409)
            res.send({ error: 'Origen no permitido!' })
        }

    } catch (e) {
        next()
    }

}
