import multer from 'multer';
import EmpleadoModel from '../model/empleado.model';
import upload from '../storage/multer';
import { EmpleadoUseCase } from './../../aplication/empleadoUseCase';
import { NextFunction, Request,Response } from 'express';
import { HttpResponse } from '../response/https.res';
import { Storage,GetSignedUrlConfig } from '@google-cloud/storage';
import { uuid } from 'uuidv4';
export class EmpleadoController {
  //CONTROLADORES PARA FUNCIONALIDADES USUARIOS
  constructor(private readonly userUseCase: EmpleadoUseCase,
              private readonly httpsResponse:HttpResponse=new HttpResponse()) {}
  
  //traemos todo
  public getCrtl=async(req:Request,res:Response):Promise<any>=>{
    try{
      const data=await this.userUseCase.getUser();
      if (!data)return this.httpsResponse.Error(res,"No existe el dato!");
      return this.httpsResponse.Ok(res,data);
    }catch(e){
      return this.httpsResponse.Error(res,"No existe el dato!");
    }};

  //traemos por grupo
  public getGroup=async(req:Request,res:Response):Promise<any>=>{
    try{
      const name=req.params.name;
      const data=await this.userUseCase.listByGroup(name);
      if (!data)return this.httpsResponse.Error(res,"No existe el dato!");
      return this.httpsResponse.Ok(res,data);
    }catch(e){
      return this.httpsResponse.Error(res,"No existe el dato!");
    }};

  //CONTROLADOR POST (Registrar un Empleado)
  public insertCtrl= async(req: Request, res: Response):Promise<any>=> {
    try{
      let body=req.body;
      let url;
      if(req.file){
        let projectId: string = process.env.GCP_PROJECT_ID || "";
        let keyFilename: string = "myKey.json" || "";
        const storage = new Storage({
          projectId,
          keyFilename
        });
        const bucket=storage.bucket(process.env.GCP_ID||"")
        const blob=bucket.file(`${uuid()}.jpg`);
        const blobStream=blob.createWriteStream();
        blobStream.on("finish",()=>{return "succcess"})
        const config:GetSignedUrlConfig = {
          action: 'read',
          expires: '03-01-2099' 
        };
        url = await blob.getSignedUrl(config);
        blobStream.end(req.file.buffer) 
      }
      let imagePath="";
      if (url)imagePath=url[0]||"";
      const data=await this.userUseCase.registerUser(imagePath,body);
      if (!data)return this.httpsResponse.Error(res,"No existe el dato!");
      return this.httpsResponse.Ok(res,data);
    }catch(e){
      return this.httpsResponse.Error(res,"No existe el dato!");
    }};

  //cargar un ingreso o egreso
  public uploadHoursCtrl=async(req:Request,res:Response):Promise<any>=>{
  try{
    const name=req.params.name;
    const body=req.body;
    const data=await this.userUseCase.uploadExtraHours(name,body)
    if (!data)return this.httpsResponse.Error(res,"No existe el dato!");
    return this.httpsResponse.Ok(res,data);
  }catch(e){
    return this.httpsResponse.Error(res,"No existe el dato!");
  }};

  //fichada
  public clockingCtrl=async(req:Request,res:Response):Promise<any>=>{
    try {
        const name = req.params.name;
        const data=await this.userUseCase.clockingUser(name)
        if(Object.keys(data).length==1)return this.httpsResponse.Error2(res,data)
        if (!data)return this.httpsResponse.Error(res,`No se pudo realizar la fichada,consulte con su supervisor o RRHH.`);
        return this.httpsResponse.Ok(res,data);
      } catch (e) {
        return this.httpsResponse.Error(res,`No se pudo realizar la fichada,\nconsulte con su supervisor o RRHH.`);
      }  
  }
  //busqueda
  public searchCtrl=async(req:Request,res:Response):Promise<any>=>{
    try{
      const match: { [key: string]: RegExp }[] = [];
      const keyword = (req.query.keyword|| '').toString() ;
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
      };
      const data = await this.userUseCase.listBySearch({ $or: match });
      if (!data)return this.httpsResponse.Error(res,"No existe el dato!");
      return this.httpsResponse.Ok(res,data);
   }catch (e) {
      return this.httpsResponse.Error(res,"No existe el dato!");
  }};

  //Traemos desde hasta 
  public dateToDate=async(req:Request, res:Response):Promise<any>=>{
  try{
    const body=req.body;
    const legajo=req.params.name;
    const data=await this.userUseCase.dateTodate(body,legajo)
    if (!data)return this.httpsResponse.Error(res,"No se pudo encontrar el dato!");
    return this.httpsResponse.Ok(res,data);
  }catch(e){
    return this.httpsResponse.Error(res,"No se pudo encontrar el dato!");
  }};

  //Actualizar cualquier dato del empleado
  public update=async(req:Request,res:Response):Promise<any>=>{
    try{
      let url;
      if(req.file){
        let projectId: string = process.env.GCP_PROJECT_ID || "";
        let keyFilename: string = "myKey.json" || "";
        const storage = new Storage({
          projectId,
          keyFilename
        });
        const bucket=storage.bucket(process.env.GCP_ID||"")
        const blob=bucket.file(`${uuid()}.jpg`);
        const blobStream=blob.createWriteStream();
        blobStream.on("finish",()=>{return "succcess"})
        const config:GetSignedUrlConfig = {
          action: 'read',
          expires: '03-01-2099' 
        };
        url = await blob.getSignedUrl(config);
        blobStream.end(req.file.buffer) 
      }
      let imagePath="";
      if (url)imagePath=url[0]||"";
      const legajo=req.params.name;
      const body=req.body;
      const data=await this.userUseCase.updateUser(legajo,imagePath,body);
      if (!data)return this.httpsResponse.Error(res,"No se pudo actualizar el empleado!");
      return this.httpsResponse.Ok(res,data);
    }catch(e){
      return this.httpsResponse.Error(res,"Error interno del servidor!");
    }};

  //Habilitacion de horas extras
  public searchDayAndUpdate=async(req:Request,res:Response):Promise<any>=>{
    try{
      const legajo=req.params.name;
      const dia=req.body;
      const data=await this.userUseCase.searchDayAndUpdate(legajo,dia)
      if (!data)return this.httpsResponse.Error(res,"No se pudo actualizar el empleado!");
      return this.httpsResponse.Ok(res,data);
    }catch(e){
      return this.httpsResponse.Error(res,"Error interno del servidor!");
    }};

  //Habilitar o deshabilitar a un empleado
  public activeCtrl=async(req:Request,res:Response):Promise<any>=>{
    try{
      const body=req.body;
      const legajo=req.params.name;
      const data=await this.userUseCase.activeUser(legajo,body[0]);
      if (!data)return this.httpsResponse.Error(res,"No se pudo actualizar el empleado!");
      return this.httpsResponse.Ok(res,data);
    }catch(e){
      return this.httpsResponse.Error(res,"Error interno del servidor!");
    }};
  
  //Ver legajo
  public legajoCtrl=async(req:Request,res:Response):Promise<void>=>{
    try{
      const legajo=req.params.name;
      const empleado=await this.userUseCase.getByLegajo(legajo);
      if (empleado)res.status(200).send({data:empleado,msg:"ok!"});
      else res.status(500).send({msg:"Internal server error!"});
    }catch(e){
       res.status(500).send({msg:"Internal server error!"})
    }};
  
  //Eliminar un usuario  
  public EliminarCtrl=async(req:Request,res:Response):Promise<any>=>{
    try{
      const id=req.params.id;
      const data=await this.userUseCase.deleteUser(id);
      if (!data)return await this.httpsResponse.Error(res,"No se pudo actualizar el empleado!");
      return await this.httpsResponse.Ok(res,data);
    }catch(e){
      return this.httpsResponse.Error(res,"Error interno del servidor!");
    }};
  //Fichadas en vivo
  public FichadasEnVivoCtrl=async(req:Request,res:Response):Promise<any>=>{
    try{
      const data=await this.userUseCase.lastClock();
      if(!data)return this.httpsResponse.Error(res,"No se pueden obtener las fichadas!");
      return this.httpsResponse.Ok(res,data);
    }catch(e){
      return this.httpsResponse.Error(res,"Error interno del servidor!");
    }}
  public ListarTurnoCtrl=async(req:Request,res:Response):Promise<any>=>{
    try{
      const turno=req.params.turno;
      const data=await this.userUseCase.rotation(turno);
      if (!data)return this.httpsResponse.Error(res,"No se puede listar por turno");
      return this.httpsResponse.Ok(res,data);
    }catch(e){
      return this.httpsResponse.Error(res,"Error interno del servidor!");
    }}
  
  public ListarPorAreaCrtl=async(req:Request,res:Response)=>{
    try{
      const area=req.params.area;
      const data=await this.userUseCase.area(area);
      if(!data)return this.httpsResponse.Error(res,"No se pudo listar por area");
      return this.httpsResponse.Ok(res,data);
    }catch(e){
      return this.httpsResponse.Error(res,"Error interno del servidor!");
    }};
    public ListarPorAreayGrupoCrtl=async(req:Request,res:Response)=>{
      try{
        const area=req.query.area as string;
        const grupo=req.query.grupo as string;
        const data=await this.userUseCase.areaygrupo(area,grupo);
        if(!data)return this.httpsResponse.Error(res,"No se pudo listar por area");
        return this.httpsResponse.Ok(res,data);
      }catch(e){
        return this.httpsResponse.Error(res,"Error interno del servidor!");
      }};
  public ListarDesdeHastaCtrl=async(req:Request,res:Response)=>{
    try{
      const area=req.params.area;
      const body=req.body;
      const data=await this.userUseCase.desdeHasta(area,body);
      if(!data)return this.httpsResponse.Error(res,"No se pudo listar por area");
      return this.httpsResponse.Ok(res,data);
    }catch(e){
      return this.httpsResponse.Error(res,"Error interno del servidor!");
    }};
  public reportCtrl=async(req:Request,res:Response)=>{
    try{
      const body=req.body;
      const data=await this.userUseCase.report()
      if(!data)return this.httpsResponse.Error(res,"No se pudo realizar el reporte");
      return this.httpsResponse.Ok(res,data);
    }catch(e){
      return this.httpsResponse.Error(res,"Error interno del servidor!");
    }
  }
  public CargarTurnoLegajo=async(req:Request,res:Response)=>{
    try{
      const {turno,fecha_inicial,fecha_final}=req.body;
      const legajo=req.params.name;
      const data=await this.userUseCase.CargarTurnoLegajo(legajo,turno,fecha_inicial,fecha_final);
      if(!data)return this.httpsResponse.Error(res,"No se pudo realizar la carga del turno");
      return this.httpsResponse.Ok(res,data);
    }catch(e){
      return this.httpsResponse.Error(res,"Error interno del servidor!");
    }
  }
  public CargarTurnoGrupo=async(req:Request,res:Response)=>{
    try{
      const {turno,fecha_inicial,fecha_final}=req.body;
      const grupo=req.params.name
      const data=await this.userUseCase.CargarTurnoGrupo(grupo,turno,fecha_inicial,fecha_final);
      if(!data)return this.httpsResponse.Error(res,"No se pudo realizar la carga del turno");
      return this.httpsResponse.Ok(res,data);
    }catch(e){
      return this.httpsResponse.Error(res,"Error interno del servidor!");
    }
  }
}
