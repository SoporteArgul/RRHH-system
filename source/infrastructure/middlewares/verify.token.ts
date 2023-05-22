import { Request,Response,NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default async function checkAuth(req:Request, res:Response, next:NextFunction){
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        jwt.verify(token, process.env.JWT_SECRET || 'secret',(err, user) => {
            if (err) {
              return res.status(403).json({ message: 'Forbidden' });
            }
            next();
          });
    } catch (e) {
        res.status(409)
        res.send({ error: 'por aca no kpo!' });
    }};