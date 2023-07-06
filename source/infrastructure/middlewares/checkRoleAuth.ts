

import { verifyToken } from '../helpers/token';
import { Request,Response,NextFunction } from 'express';
import UserModel from '../model/usuario.model';


type UserRole = "Root" | "Administrador" | "Usuario";
const checkRoleAuth = (roles:UserRole|UserRole[]) => async (req:Request, res:Response, next:NextFunction) => {
    try {
        const token = req.headers.authorization||"";
        const id=req.params.id;
        const tokenData = await verifyToken(token)
        if(tokenData && roles){
            const user=await UserModel.findById({_id:id});
            if(user){
                const userRole = user.rol;
                if (Array.isArray(roles))if (roles.includes(userRole))next();    
                else res.status(409).send({error:"No tenes permisos!"});
                if (roles === userRole)next();
                else res.status(409).send({ error: "No tienes permisos suficientes." });
            }else res.status(401).send({error:"Usuario invalido!"});
        }else res.status(404).send({error:"Error de validacion!"})

    } catch (e) {
        res.status(409).send({ error: 'Tu por aqui no pasas!' })
        
    }

}

export default checkRoleAuth