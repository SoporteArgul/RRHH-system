import { EmpleadoUseCase } from "../../aplication/empleadoUseCase"
import { Request,Response } from 'express';

export class EmpleadoController {
  //CONTROLADORES PARA FUNCIONALIDADES USUARIOS
  constructor(private userUseCase: EmpleadoUseCase) {}
  
  public getCrtl=async(req:Request,res:Response):Promise<void>=>{
    try{
      const user=await this.userUseCase.getUser()
      user.forEach((empleado:any) => {
        empleado.jornada.forEach((jornada:any)=>{
          if(jornada.entrada){
            jornada.entrada=new Date(jornada.entrada.getTime() - (3 * 60 * 60 * 1000));
          }
          if(jornada.salida){
            jornada.salida=new Date(jornada.salida.getTime() - (3 * 60 * 60 * 1000));
          }
        })
        empleado.jornada_extra.forEach((jornada:any)=>{
          if(jornada.entrada){
            jornada.entrada=new Date(jornada.entrada.getTime() - (3 * 60 * 60 * 1000));
          }
          if(jornada.salida){
            jornada.salida=new Date(jornada.salida.getTime() - (3 * 60 * 60 * 1000));
          }
        })
      });
      res.status(200).send(user)
    }catch(e){
    console.log(e)
    }
    }  //CONTROLADOR POST (Registrar un usuario)
  
  public insertCtrl= async({body}: Request, res: Response):Promise<void>=> {
    try{ 
        const user=await this.userUseCase.registerUser(body)
        res.send({user})
    }catch(e){
        console.log(e)
        res.status(500).json({ error: 'Internal server error' });
    }}

public uploadHoursCtrl=async(req:Request,res:Response):Promise<void>=>{
  try{
    const id=req.params.id;
    const data=req.body;
    const user=await this.userUseCase.uploadExtraHours(id,data)
    res.status(200).send("Horas adicionales cargadas con exito!");
  }catch(e){
    res.status(500).json({ error: 'Internal server error' });
  }
}

public clockingCtrl=async(req:Request,res:Response):Promise<void>=>{
    try {
        const name = req.params.id;
        const data=req.body
        const empleado=await this.userUseCase.clockingUser(name,data)
        res.send(empleado)
      } catch (e) {
        console.error(e);
        res.status(500).send({ message: 'Internal server error' });
      }  
}

public clockingExtraCtrl=async(req:Request,res:Response):Promise<void>=>{
  try {
    const name = req.params.id;
    const data=req.body
    const empleado=await this.userUseCase.clockingUserExtra(name,data)
    res.send(empleado)
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Internal server error' });
  }
}

public dateToDate=async(req:Request, res:Response):Promise<void>=>{
  try{
    const data=req.body
    const empleado=await this.userUseCase.dateTodate(data)
    if (!empleado){
      throw new Error("no se pudo filtrar")
    }else{
      res.status(200).send({data:empleado,msg:"Fechas filtradas con exito"})
    }
    
  }catch(e){
    res.status(500).send({ message: 'Internal server error' });
  }
}
}
