import  { EmpleadoValue }  from '../domain/empleado/empleado.value';
import { EmpleadoRepository } from "../domain/empleado/empleado.repository"
import { encrypt } from '../infrastructure/helpers/handleByCrypt';
import {Categorias,Educacion,Domicilio, Jornadas, Liquidacion} from "../domain/empleado/empleado.interface";
import moment from 'moment-timezone';
import buscarFecha from '../infrastructure/scripts/utils/buscar.fecha';
import "dotenv/config"
import resizeImage from '../infrastructure/storage/sharp';
export class EmpleadoUseCase{
    constructor(private readonly empleadoRepository:EmpleadoRepository){}

    //REGISTRAR USUARIO 
    public registerUser=async(imagePath:string,{nombre,apellido,edad,cuil,dni,sexo,legajo,email,telefono,domicilio,fecha_ingreso,fecha_egreso,nivel_educacion,activo,convenio,contratacion,categoria,gerencia,area,sector,puesto,rol,tipo_liquidacion,rotacion,grupo,turno,jornada,liquidacion,observaciones}:{nombre:string;apellido:string;edad:number;cuil:string;dni:string;sexo:string;legajo:number;email:string;telefono:string;domicilio:Domicilio[];fecha_ingreso:string;fecha_egreso:string;nivel_educacion:Educacion[];activo:boolean;convenio:string;contratacion:string;categoria:Categorias[];gerencia:string;area:string;sector:string;puesto:string;rol:string;tipo_liquidacion:string;rotacion:string,grupo:string,turno:string,jornada:Jornadas[];liquidacion:Liquidacion[];observaciones:string;foto:string;})=>{
        try{
            resizeImage(imagePath)
            const host=process.env.APP_HOST;
            const port=process.env.PORT;
            imagePath=`${host}${port}/${imagePath}`;
            const userValue=new EmpleadoValue({nombre,apellido,edad,cuil,dni,sexo,legajo,email,telefono,fecha_ingreso,fecha_egreso,domicilio,nivel_educacion,activo,convenio,contratacion,categoria,gerencia,area,sector,puesto,rol,tipo_liquidacion,rotacion,grupo,turno,jornada,liquidacion,observaciones,foto:imagePath})
            const userCreated=await this.empleadoRepository.registerUser(imagePath,userValue)
            return userCreated 
        }catch(e){
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
    public updateUser=async(id:string,{nombre,apellido,edad,cuil,dni,sexo,legajo,email,telefono,domicilio,fecha_ingreso,fecha_egreso,nivel_educacion,activo,convenio,contratacion,categoria,gerencia,area,sector,puesto,rol,tipo_liquidacion,rotacion,grupo,turno,jornada,liquidacion,observaciones,foto}:{nombre:string;apellido:string;edad:number;cuil:string;dni:string;sexo:string;legajo:number;email:string;telefono:string;domicilio:Domicilio[];fecha_ingreso:string;fecha_egreso:string;nivel_educacion:Educacion[];activo:boolean;convenio:string;contratacion:string;categoria:Categorias[];gerencia:string;area:string;sector:string;puesto:string;rol:string;tipo_liquidacion:string;rotacion:string,grupo:string,turno:string,jornada:Jornadas[];liquidacion:Liquidacion[];observaciones:string;foto:string;})=>{
        try{
           const userValue=new EmpleadoValue({nombre,apellido,edad,cuil,dni,sexo,legajo,email,telefono,fecha_ingreso,fecha_egreso,domicilio,nivel_educacion,activo,convenio,contratacion,categoria,gerencia,area,sector,puesto,rol,tipo_liquidacion,rotacion,turno,grupo,jornada,liquidacion,observaciones,foto})
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
            moment.locale('es');
            moment.tz.setDefault('America/Argentina/Buenos_Aires');
            empleadoId=empleadoId.toString();
            const fechaActual=moment().format("YYYY-MM-DD").toString();
            const horaActual = "14:22:06"
            const horaActualDate = moment(horaActual, 'LTS').toDate();
            let jornadas=null
            const empleado=await this.empleadoRepository.findByLegajo(empleadoId) //buscamos el empleado que queremos modificar
            if (empleado) {
                //verificamos que este el empleado
                jornadas=buscarFecha(empleado.jornada,fechaActual)
                if (jornadas){
                //ENTRADA
                if (jornadas.entrada==null && !jornadas.habilitado_horas_extra){
                    if (empleado.turno =="mañana" && (horaActual>="05:00:00" && horaActual<="06:06:00")){ 
                        jornadas.entrada=horaActualDate
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                    if (empleado.turno =="tarde"&& (horaActual>="13:00:00" && horaActual<="14:06:00")){
                        jornadas.entrada=horaActualDate
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                    if (empleado.turno =="noche"&& (horaActual>="21:00:00"&& horaActual<="22:05:00")){
                        jornadas.entrada=horaActualDate
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                }else{
                    if(jornadas.entrada==null && jornadas.habilitado_horas_extra && jornadas.salida_horas_extra){
                        if (empleado.turno =="mañana" && (horaActual>="05:00:00" && horaActual<="06:06:00")){ 
                            jornadas.entrada=horaActualDate
                            const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                            return resultado;
                        }
                        if (empleado.turno =="tarde"&& (horaActual>="13:00:00" && horaActual<="14:06:00")){
                            jornadas.entrada=horaActualDate;
                            const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                            return resultado;
                        }
                        if (empleado.turno =="noche"&& (horaActual>="21:00:00"&& horaActual<="22:05:00")){
                            jornadas.entrada=horaActualDate;
                            const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                            return resultado;
                        }
                    }
                };
                //SALIDA
                if (jornadas.entrada != null && jornadas.salida==null){
                    if (empleado.turno=="mañana" && (horaActual>="14:00:00" && horaActual<="14:45:00")){
                        jornadas.salida=horaActualDate
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                    if (empleado.turno=="tarde" && (horaActual>="22:00:00" && horaActual<="22:45:00")){
                        jornadas.salida=horaActualDate
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                    if (empleado.turno=="noche" && (horaActual>="06:00:00" && horaActual<="06:45:00")){
                        jornadas.salida=horaActualDate;
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                }
                //ENTRADA DESCANSO
                if(jornadas.entrada && jornadas.entrada_descanso==null){
                    if(empleado.turno=="mañana"&& (horaActual>="07:00:00"&&horaActual<="13:35:00")){
                        jornadas.entrada_descanso=horaActualDate;
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                    if(empleado.turno=="tarde"&&horaActual>="15:00:00"&&horaActual<="21:35:00"){
                        jornadas.entrada_descanso=horaActualDate;
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                    if(empleado.turno=="noche"&&((horaActual>="23:00:00"&&horaActual<="23:59:59")||(horaActual>="00:00:00"&&horaActual<="05:35:00"))){
                        jornadas.entrada_descanso=horaActualDate;
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                }
                //SALIDA DESCANSO
                if(jornadas.entrada && jornadas.entrada_descanso && jornadas.salida_descanso==null){
                    const diffMins = Math.round((moment(horaActual,"HH:mm:ss").toDate().getTime()-jornadas.entrada_descanso.getTime()) / 60000);
                    if( diffMins >= 10){
                        if(empleado.turno=="mañana"&&horaActual>="07:25:00"&&horaActual<="13:55:00"){
                            jornadas.salida_descanso=horaActualDate;
                            const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                            return resultado;
                        }
                        if(empleado.turno=="tarde"&&(horaActual>="15:25:00"&&horaActual<="21:55:00")){
                            jornadas.salida_descanso=horaActualDate;
                            const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                            return resultado;
                        }
                        if(empleado.turno=="noche"&&(horaActual>="23:25:00"&&horaActual<="23:59:00")||(horaActual>="00:00:00"&&horaActual<="05:35:00")){
                            jornadas.salida_descanso=horaActualDate;
                            const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                            return resultado;
                        }
                    }

                }
                //HORAS EXTRA ENTRADA
                if((jornadas.entrada && jornadas.salida) && jornadas.habilitado_horas_extra && jornadas.entrada_horas_extra==null && empleado.turno=="mañana" ){
                    if (horaActual>="14:00:00" && horaActual<="14:20:00" ){
                        jornadas.entrada_horas_extra=horaActualDate
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }}
                if((!jornadas.entrada&&!jornadas.salida) && jornadas.habilitado_horas_extra && (empleado.turno=="noche"||empleado.turno=="tarde")){
                    if (empleado.turno=="tarde" && ( horaActual>="09:45:00" && horaActual<= "13:05:00")){
                        jornadas.entrada_horas_extra=horaActualDate                       
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                    if(empleado.turno=="noche" && (horaActual>="17:45" && horaActual <= "21:05" )){
                        jornadas.entrada_horas_extra=horaActualDate 
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado; 
                    }}
                //HORAS EXTRA SALIDA
                if (jornadas.habilitado_horas_extra && jornadas.entrada_horas_extra &&  jornadas.salida_horas_extra==null){
                    if(empleado.turno=="tarde" && (horaActual>="11:00:00" && horaActual<="14:15:00") ){
                        jornadas.salida_horas_extra=horaActualDate
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                    if(empleado.turno=="mañana"&& (horaActual>="13:00:00" && horaActual<="18:45:00")){
                        jornadas.salida_horas_extra=horaActualDate
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                    if(empleado.turno=="noche"&& horaActual<="22:45"){
                        jornadas.salida_horas_extra=horaActualDate
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }

                }
                }}
        }catch(e){
            console.log(e)
            console.log("Error de repositorio")
        }}
    
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
    public updateDailyHours=async()=>{
        try{
            const user=await this.empleadoRepository.updateDailyHours()
            return user
        }catch(e){
            console.log("Error, no se pudo cargar las jornadas trabajadas diarias")
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