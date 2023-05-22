import { validationResult } from 'express-validator';
import { UsuarioUseCase } from "../../aplication/usuarioUseCase";
import { Request,Response } from "express";
import jwt  from 'jsonwebtoken';
import {compare} from "../helpers/handleByCrypt";


const ERROR="Internal Server Error!";


export class usuarioController{
    constructor(private usuarioUseCase:UsuarioUseCase){}

    public login=async(req:Request,res:Response)=>{
        try{
            const {email,password}=req.body;
            const user=await this.usuarioUseCase.login(email);
            const checkPassword = await compare(password, user.password);
            if (user && checkPassword){
                const token: string = jwt.sign({ _id: user._id }, process.env['JWT_SECRET'] || '', {
                expiresIn: 60 * 60 * 24
                });
                res.status(200).send({user:user,token:token,msg:"Exito!"});
            }else{
                res.status(409).send({msg:"Usuario o contraseña incorrecta!"});
            };
        }catch(e){
            res.status(404).send({error:ERROR})
        }};
    
    public userRegister=async(req:Request,res:Response):Promise<void>=>{
        try{
            const data=req.body;
            const validationErrors = validationResult(data);//Validamos lo que llega en nuestro body!
            if (!validationErrors.isEmpty()) {
                res.status(400).send("Error de validacion!");
            };
            if (data.password_1==data.password_2){
                const empleado=await this.usuarioUseCase.register(data);
                if(empleado)res.status(200).send({data:empleado,msg:"Exito!"});
            }
            else res.status(404).send({error:"Las contraseñas deben coincidir!"});
        }catch(e){
            res.status(404).send({error:ERROR});
        }
    };

    public userUpdate=async(req:Request,res:Response):Promise<void>=>{
        try{
            const data=req.body;
            const id=req.params.id;
            const empleado=await this.usuarioUseCase.update(id,data);
            if(empleado)res.status(200).send({data:empleado,msg:"Exito!"});
            else res.status(404).send({error:ERROR});
        }catch(e){
            res.status(404).send({error:ERROR});
        }
    };

    public userDelete=async(req:Request,res:Response):Promise<void>=>{
        try{
            const id=req.params.id;
            const empleado=await this.usuarioUseCase.delete(id);
            if (empleado)res.status(200).send({data:empleado,msg:"Exito!"});
            else res.status(404).send({error:ERROR});
        }catch(e){
            res.status(404).send({error:ERROR});
        }
    };

    public userList=async(req:Request,res:Response):Promise<void>=>{
        try{
            const empleado=await this.usuarioUseCase.list()
            if(empleado)res.status(200).send({data:empleado,msg:"Exito!"});
            else res.status(404).send({error:ERROR});
        }catch(e){
            res.status(404).send({error:ERROR});
        }
    };

}