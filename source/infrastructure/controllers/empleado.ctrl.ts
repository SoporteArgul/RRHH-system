import multer from 'multer';
import EmpleadoModel from '../model/empleado.model';
import upload from '../storage/multer';
import { EmpleadoUseCase } from './../../aplication/empleadoUseCase';
import { NextFunction, Request,Response } from 'express';

export class EmpleadoController {
  //CONTROLADORES PARA FUNCIONALIDADES USUARIOS
  constructor(private userUseCase: EmpleadoUseCase) {}
  
  //traemos todo
  public getCrtl=async(req:Request,res:Response):Promise<void>=>{
    try{
      const user=await this.userUseCase.getUser()
      res.status(200).send(user)
    }catch(e){
    console.log(e)
    }
    }  
  //traemos por grupo
  public getGroup=async(req:Request,res:Response):Promise<void>=>{
    try{
      const data=req.params.name;
      const user=await this.userUseCase.listByGroup(data)
      res.status(200).send({data:user,msg:"Empleado listado con exito"});
      
    }catch(e){
      res.status(500).send({error:'Internal server error'});
    }};
  //CONTROLADOR POST (Registrar un Empleado)
  public insertCtrl= async(req: Request, res: Response):Promise<void>=> {
    try{

        let data=req.body;
        const imagePath=req.file?.path||"";
        const user=await this.userUseCase.registerUser(imagePath,data)
        res.send({user})
    }catch(e){

        res.status(500).json({ error: 'Internal server error' });
    }}
  //cargar un ingreso o egreso
  public uploadHoursCtrl=async(req:Request,res:Response):Promise<void>=>{
  try{
    const id=req.params.name;
    const data=req.body;
    const user=await this.userUseCase.uploadExtraHours(id,data)
    res.status(200).send({data:user,msg:"Horas adicionales cargadas con exito!"});
  }catch(e){
    res.status(500).json({ error: 'Internal server error' });
  }
  }
  //fichada
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
  //busqueda
  public searchCtrl=async(req:Request,res:Response):Promise<void>=>{
    try{
      const match: { [key: string]: RegExp }[] = [];
      const keyword = req.query.keyword?.toString() || '';
      if (keyword) {
      match.push(
          { nombre: new RegExp(keyword, 'i')},
          { apellido:new RegExp(keyword, 'i')},
          { legajo: new RegExp(keyword.toString(), 'i')},
          { rotacion: new RegExp(keyword, 'i')},
          { grupo: new RegExp(keyword, 'i')},
          { turno: new RegExp(keyword, 'i')},
          { tipo_liquidacion: new RegExp(keyword, 'i')},
          { gerencia: new RegExp(keyword, 'i')},
      );
      }
      
      const query = match.length > 0 ? { $or: match } : {};
      const form = await this.userUseCase.listBySearch({ $or: match });
      res.status(200).send({ data: form, msg: 'Búsqueda realizada con éxito!' });
  } catch (e) {
      res.status(500).send({ error: 'Internal server error' });
  }}

  //traemos desde hasta 
  public dateToDate=async(req:Request, res:Response):Promise<void>=>{
  try{
    const data=req.body;
    const legajo=req.params.name;
    const empleado=await this.userUseCase.dateTodate(data,legajo)
    if (!empleado){
      throw new Error("no se pudo filtrar")
    }else{
      res.status(200).send({data:empleado,msg:"Fechas filtradas con exito"})
    }
    
  }catch(e){
    res.status(500).send({ message: 'Internal server error' });
  }
  }
  //actualizar cualquier dato del empleado
  public update=async(req:Request,res:Response):Promise<void>=>{
    try{
      let imagePath=req.file?.path||"";
      const legajo=req.params.name;
      const data=req.body;
      const empleado=await this.userUseCase.updateUser(legajo,imagePath,data);
      res.status(200).send({data:empleado,msg:"Empleado actualizado con exito"});
    }catch(e){
      res.status(500).send({msg:"Internal server error!"})
    }
  }
  //habilitacion de horas extras
  public searchDayAndUpdate=async(req:Request,res:Response):Promise<void>=>{
    try{
      const legajo=req.params.name;
      const dia=req.body;
      const empleado=await this.userUseCase.searchDayAndUpdate(legajo,dia[0])
      if (empleado){
        res.status(200).send({data:empleado,msg:"Habilitado!"})
      }else{
        res.status(500).send({msg:"Internal server error!"})
      }
    }catch(e){
      res.status(500).send({msg:"Internal server error!"})
    }
  }
  //Habilitar o deshabilitar a un empleado
  public activeCtrl=async(req:Request,res:Response):Promise<void>=>{
    try{
      const data=req.body;
      const legajo=req.params.name;
      const empleado=await this.userUseCase.activeUser(legajo,data[0]);
      if (empleado)res.status(200).send({data:empleado,msg:"Operacion realizada con exito"});
      else res.status(500).send({msg:"Internal server error!"})
    }catch(e){
      res.status(500).send({msg:"Internal server error!"})
    }
  }
  public legajoCtrl=async(req:Request,res:Response):Promise<void>=>{
    try{
      const legajo=req.params.name;
      const empleado=await this.userUseCase.getByLegajo(legajo);
      if (empleado)res.status(200).send({data:empleado,msg:"ok!"});
      else res.status(500).send({msg:"Internal server error!"})
    }catch(e){
       res.status(500).send({msg:"Internal server error!"})
    }
  }
  public EliminarCtrl=async(req:Request,res:Response):Promise<void>=>{
    try{
      const id=req.params.id;
      const empleado=await this.userUseCase.deleteUser(id);
      if (empleado)res.status(200).send({data:empleado,msg:"ok!"});
      else res.status(500).send({msg:"Internal server error!"})
    }catch(e){
      res.status(500).send({msg:"Internal server error!"})
    }
  }
}
