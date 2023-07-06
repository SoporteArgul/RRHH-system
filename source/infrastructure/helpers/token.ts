import jwt  from "jsonwebtoken";
import "dotenv/config"


export  async function  verifyToken (token:string){
    //Verificacion de Token
    try {
        return jwt.verify(token, process.env.JWT_SECRET||"")//verificamos
    } catch(e){
        console.log(e)
        return "No se pudo verificar el token"
    }};

 export default function decodeSign(token:string){
    //Decodificamos y nos fijamos que el token sea correcto
    return jwt.decode(token)}