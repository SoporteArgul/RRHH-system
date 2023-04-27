import  { EmpleadoValue }  from '../domain/empleado/empleado.value';
import { EmpleadoRepository } from "../domain/empleado/empleado.repository"
import { encrypt } from '../infrastructure/helpers/handleByCrypt';
import {Contratacion,Categorias,Educacion,Domicilio,Dias,LiquidacionMeses, EntradaSalida, Convenio, movimientos} from "../domain/empleado/empleado.interface";

export class EmpleadoUseCase{
    constructor(private readonly empleadoRepository:EmpleadoRepository){}

    //REGISTRAR USUARIO 
    public registerUser=async({nombre,apellido,edad,cuil,dni,sexo,legajo,email,telefono,domicilio,nivel_educacion,activo,fecha_ingreso,fecha_egreso,convenio,contratacion,categoria,gerencia,area,sector,puesto,rol,jornada,almuerzo,foto,liquidacion,observaciones,uuid,fichada}:{fichada:EntradaSalida[],nombre:string;apellido:string;edad:Number;cuil:string;dni:string;sexo:string;legajo:Number;email:string;telefono:string;domicilio:Domicilio[];nivel_educacion:Educacion[];activo:Boolean;fecha_ingreso:string;fecha_egreso:string;convenio:Convenio[];contratacion:Contratacion[];categoria:Categorias[];gerencia:string;area:string;sector:string;puesto:string;rol:string;jornada:movimientos[];almuerzo:Dias[],foto:string;liquidacion:LiquidacionMeses[];observaciones:string;uuid:string;})=>{
        try{
            const userValue=new EmpleadoValue({nombre,apellido,edad,cuil,dni,sexo,legajo,email,telefono,domicilio,nivel_educacion,activo,fecha_ingreso,fecha_egreso,convenio,contratacion,categoria,gerencia,area,sector,puesto,rol,jornada,almuerzo,foto,liquidacion,observaciones,uuid,fichada})
            const userCreated=await this.empleadoRepository.registerUser(userValue)
            return userCreated 
        }catch(e){
            console.log(e)
            console.log('Error, no se pudo registrar el usuario.')
        }};
    
    //LISTAR USUARIOS
    public  getUser = async () => {
        try{
            const user = await this.empleadoRepository.listUser()
            return user
        }catch(e){
            console.log("Error, no se pudo listar usuarios.")
        }};
    
    public listByGroup=async(group:string)=>{
        try{
            const user=await this.empleadoRepository.listByGroup(group)
            return user
        }catch(e){
            throw Error("Error no se pudo listar el usuario")
        }
    }
    
    //MODIFICAR USUARIO
    public updateUser=async(id:string,{nombre,apellido,edad,cuil,dni,sexo,legajo,email,telefono,domicilio,nivel_educacion,activo,fecha_ingreso,fecha_egreso,convenio,contratacion,categoria,gerencia,area,sector,puesto,rol,jornada,almuerzo,foto,liquidacion,observaciones,uuid,fichada}:{fichada:EntradaSalida[],nombre:string;apellido:string;edad:Number;cuil:string;dni:string;sexo:string;legajo:Number;email:string;telefono:string;domicilio:Domicilio[];nivel_educacion:Educacion[];activo:Boolean;fecha_ingreso:string;fecha_egreso:string;convenio:Convenio[];contratacion:Contratacion[];categoria:Categorias[];gerencia:string;area:string;sector:string;puesto:string;rol:string;jornada:movimientos[];almuerzo:Dias[],foto:string;liquidacion:LiquidacionMeses[];observaciones:string;uuid:string;})=>{
        try{
            const userValue=new EmpleadoValue({nombre,apellido,edad,cuil,dni,sexo,legajo,email,telefono,domicilio,nivel_educacion,activo,fecha_ingreso,fecha_egreso,convenio,contratacion,categoria,gerencia,area,sector,puesto,rol,jornada,almuerzo,foto,liquidacion,observaciones,uuid,fichada})

           const user=await this.empleadoRepository.updateUser(id,userValue)
           return user
        }catch(e){
            console.log("Error, no se pudo actualizar el usuario.")
        }};
    
    //ELIMINAR USUARIO
    public deleteUser=async(id:string)=>{
        try{
            const user=await this.empleadoRepository.deleteUser(id)
            return user
        }catch(e){
            console.log("Error, no se puede eliminar el usuario.")
        }};
    
    //FICHADA USUARIO
    public clockingUser=async(empleadoId:string,data:Array<string>)=>{
        try{
            const user=await this.empleadoRepository.clockingUser(empleadoId,data)
            return user
        }catch(e){
            console.log("Error, no se pudo fichar usuario.")
        }};
    
    public uploadExtraHours=async(id:string,data:Array<Date>)=>{
        try{
            const user=await this.empleadoRepository.updateExtraHours(id,data)
        }catch(e){
            console.log("Error, no se pudo actualizar las horas extras")
        }
    }

    public dateTodate=async(data:Date[])=>{
        try{
            const user=await this.empleadoRepository.dateToDate(data)
            return user
        }catch(e){
            console.log("No se pudo filtrar fechas!")
        }
    }

    //LOGUEAR USUARIO
    public login=async(email:string)=>{
        try{
            const user=await this.empleadoRepository.login(email)
            return user
        }catch(e){
            console.log("Error, no se pudo loguear el usuario")
        }};
    
}