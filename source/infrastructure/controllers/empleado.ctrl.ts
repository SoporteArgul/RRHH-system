import { json } from "body-parser";
import { EmpleadoUseCase } from "../../aplication/empleadoUseCase"
import { Request,Response } from 'express';

export class EmpleadoController {
  //CONTROLADORES PARA FUNCIONALIDADES USUARIOS
  constructor(private userUseCase: EmpleadoUseCase) {}
  
  public getCrtl=async(req:Request,res:Response):Promise<void>=>{
    try{
      const user=await this.userUseCase.getUser()
      for (const emp of user) {
        for (const jornada of emp.jornada.flat()) {
          if(jornada.entrada){
            jornada.entrada=new Date(jornada.entrada.getTime() - (3 * 60 * 60 * 1000));
          }
          if(jornada.salida){
            jornada.salida=new Date(jornada.salida.getTime() - (3 * 60 * 60 * 1000));
          }
          if(jornada.entrada_horas_extra){
            jornada.entrada=new Date(jornada.entrada.getTime() - (3 * 60 * 60 * 1000));
          }
          if(jornada.salida_horas_extra){
            jornada.salida=new Date(jornada.salida.getTime() - (3 * 60 * 60 * 1000));
          }
        }}
      res.status(200).send(user)
    }catch(e){
    console.log(e)
    }
    }  

  public getGroup=async(req:Request,res:Response):Promise<void>=>{
    try{
      const data=req.params.name;
      const user=await this.userUseCase.listByGroup(data)
      res.status(200).send({data:user,msg:"Empleado listado con exito"});
      
    }catch(e){
      res.status(500).send({error:'Internal server error'});
    }};
  //CONTROLADOR POST (Registrar un usuario)
  public insertCtrl= async(req: Request, res: Response):Promise<void>=> {
    try{
        let data=req.body;
        data.nivel_educacion=JSON.parse(req.body.nivel_educacion)
        data.domicilio=JSON.parse(req.body.domicilio)
        data.categoria=JSON.parse(req.body.categoria)
        const image=req.file?.path||"";
        const user=await this.userUseCase.registerUser(image,data)
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
    res.status(200).send({data:user,msg:"Horas adicionales cargadas con exito!"});
  }catch(e){
    res.status(500).json({ error: 'Internal server error' });
  }
}

public clockingCtrl=async(req:Request,res:Response):Promise<void>=>{
    try {
        const name = req.params.name;
        const data=req.body
        const empleado=await this.userUseCase.clockingUser(name,data)
        if (!empleado){
          res.status(500).send("no se pudo realizar la fichada, intente nuevamente o notifique a recursos humanos")
        }
        res.send(empleado)
      } catch (e) {
        res.status(500).send({ message: 'Internal server error' });
      }  
}

public updateDailyHoursCtrl=async(req:Request,res:Response)=>{
  try{
    const empleado=await this.userUseCase.updateDailyHours()
    if (!empleado)res.status(500).send("no se pudo actualizar las horas diarias")
    res.status(200).send({msg:"Datos actualizados con exito"})
  }catch(e){
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
