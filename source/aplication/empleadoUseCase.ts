import  { EmpleadoValue }  from '../domain/empleado/empleado.value';
import { EmpleadoRepository } from "../domain/empleado/empleado.repository"
import {Jornadas, Liquidacion} from "../domain/empleado/empleado.interface";
import moment from 'moment-timezone';
import buscarFecha from '../infrastructure/scripts/utils/buscar.fecha';
import "dotenv/config"
import resizeImage from '../infrastructure/storage/sharp';
import writeExcelFile from 'write-excel-file/node'
import { Clock } from '../infrastructure/helpers/clocking';
import report from '../infrastructure/helpers/report';


const ERROR="Error, vuelva a intentar mas tarde"
export class EmpleadoUseCase{
    constructor(
        private readonly empleadoRepository:EmpleadoRepository,
        private readonly clock:Clock){}
    
    //REGISTRAR USUARIO 
    public registerUser=async(imagePath:string,{ legajo, apellido, nombre, cuil, contratacion, fecha_ingreso, gerencia, area, sector, centro_de_costo, convenio, categoria, dni, fecha_nacimiento, sexo, email, telefono, telefono_urgencias, pais, provincia, localidad, calle, numero, dpto, piso, codigo_postal, nivel_de_educacion, activo, fecha_egreso, estado_ambiental, examen_preocupacional, tipo_liquidacion, rotacion, turno, grupo, jornada, liquidacion, observaciones, foto}:{legajo: string;apellido: string;nombre: string;cuil: string;contratacion: string;fecha_ingreso:Date;gerencia: string;area: string;sector: string;centro_de_costo:string;convenio: string;categoria: string;dni: string;fecha_nacimiento:string;sexo: string;email: string;telefono: string;telefono_urgencias:string;pais:string;provincia:string;localidad:string;calle:string;numero:string;dpto:string;piso:string;        codigo_postal:string;nivel_de_educacion:string;activo: boolean;fecha_egreso:Date;estado_ambiental:string;examen_preocupacional:string;tipo_liquidacion:string;rotacion:string;turno:string;grupo:string;jornada: Jornadas[];liquidacion: Liquidacion[];observaciones: string;foto: string;})=>{
        try{
            resizeImage(imagePath)
            const host=process.env.APP_HOST;
            const port=process.env.PORT;
            imagePath=`${host}${port}/${imagePath}`;
            const userValue=new EmpleadoValue({ legajo, apellido, nombre, cuil, contratacion, fecha_ingreso, gerencia, area, sector, centro_de_costo, convenio, categoria, dni, fecha_nacimiento, sexo, email, telefono, telefono_urgencias, pais, provincia, localidad, calle, numero, dpto, piso, codigo_postal, nivel_de_educacion, activo, fecha_egreso, estado_ambiental, examen_preocupacional, tipo_liquidacion, rotacion, turno, grupo, jornada, liquidacion, observaciones, foto:imagePath})
            const userCreated=await this.empleadoRepository.registerUser(imagePath,userValue)
            return userCreated 
        }catch(e){

            return ERROR
        }};
    
    //LISTAR USUARIOS
    public  getUser = async () => {
        try{
            const user = await this.empleadoRepository.listUser()
            return user
        }catch(e){
            return ERROR
        }};
    
    //LISTAR POR EL GRUPO
    public listByGroup=async(group:string)=>{
        try{
            const user=await this.empleadoRepository.listByGroup(group)
            return user
        }catch(e){
            return ERROR
        }
    }
    
    //MODIFICAR USUARIO
    public updateUser=async(id:string,imagePath:string,{ legajo, apellido, nombre, cuil, contratacion, fecha_ingreso, gerencia, area, sector, centro_de_costo, convenio, categoria, dni, fecha_nacimiento, sexo, email, telefono, telefono_urgencias, pais, provincia, localidad, calle, numero, dpto, piso, codigo_postal, nivel_de_educacion, activo, fecha_egreso, estado_ambiental, examen_preocupacional, tipo_liquidacion, rotacion, turno, grupo, jornada, liquidacion, observaciones, foto}:{legajo: string;apellido: string;nombre: string;cuil: string;contratacion: string;fecha_ingreso:Date;gerencia: string;area: string;sector: string;centro_de_costo:string;convenio: string;categoria: string;dni: string;fecha_nacimiento:string;sexo: string;email: string;telefono: string;telefono_urgencias:string;pais:string;provincia:string;localidad:string;calle:string;numero:string;dpto:string;piso:string;        codigo_postal:string;nivel_de_educacion:string;activo: boolean;fecha_egreso:Date;estado_ambiental:string;examen_preocupacional:string;tipo_liquidacion:string;rotacion:string;turno:string;grupo:string;jornada: Jornadas[];liquidacion: Liquidacion[];observaciones: string;foto: string;})=>{
        try{
            if (imagePath!=""){
                resizeImage(imagePath)
                const host=process.env.APP_HOST;
                const port=process.env.PORT;
                imagePath=`${host}${port}/${imagePath}`;
                const userValue=new EmpleadoValue({ legajo, apellido, nombre, cuil, contratacion, fecha_ingreso, gerencia, area, sector, centro_de_costo, convenio, categoria, dni, fecha_nacimiento, sexo, email, telefono, telefono_urgencias, pais, provincia, localidad, calle, numero, dpto, piso, codigo_postal, nivel_de_educacion, activo, fecha_egreso, estado_ambiental, examen_preocupacional, tipo_liquidacion, rotacion, turno, grupo, jornada, liquidacion, observaciones, foto:imagePath})
                const user=await this.empleadoRepository.updateUser(id,userValue)
                return user
            }else{
                const userValue=new EmpleadoValue({ legajo, apellido, nombre, cuil, contratacion, fecha_ingreso, gerencia, area, sector, centro_de_costo, convenio, categoria, dni, fecha_nacimiento, sexo, email, telefono, telefono_urgencias, pais, provincia, localidad, calle, numero,dpto, piso, codigo_postal, nivel_de_educacion, activo, fecha_egreso, estado_ambiental, examen_preocupacional, tipo_liquidacion, rotacion, turno, grupo, jornada, liquidacion, observaciones, foto})
                const user=await this.empleadoRepository.updateUser(id,userValue)
                return user
            }
        }catch(e){
            console.log(e)
           return ERROR
        }};
    
    //ELIMINAR USUARIO
    public deleteUser=async(id:string)=>{
        try{
            const user=await this.empleadoRepository.deleteUser(id)
            return user
        }catch(e){
            return ERROR
        }};
    
    //FICHADA USUARIO
    public clockingUser=async(empleadoId:string)=>{
        try{
            const empleado=await this.empleadoRepository.findByLegajo(empleadoId);
            const fechaActual=moment().format("YYYY-MM-DD").toString();
            const jornada=buscarFecha(empleado.jornada,fechaActual)
            // const hora=new Date().toLocaleTimeString('es-AR', { hour12: false });
            const hora="14:00:00"
            const horaActual=moment(hora, 'LTS').toDate();
            if(empleado && jornada){
               const entrada= await this.clock.entrada(empleado,jornada,horaActual)
               if(entrada)return entrada;
               const descanso=await this.clock.descanso(empleado,jornada,horaActual);
               if(descanso)return descanso;
               const salida=await this.clock.salida(empleado,jornada,horaActual);
               if(salida)return salida;
               const horas_extra=await this.clock.horasExtra(empleado,jornada,horaActual);
               if(horas_extra)return horas_extra;
               const error=await this.clock.existe(empleado,jornada,horaActual)
               if(error)return error
            }
        }catch(e){
            return ERROR
        }
       }

    //CARGAR FICHADA MANUAL
    public uploadExtraHours=async(id:string,data:Array<Date|string>)=>{
        try{
            //esta va a ser una funcionalidad para los administradores donde van a poder cargar 
            //jornadas y horas extras que no se hayan cargado
            const e=moment(data[2]).toDate()
            const s=moment(data[3]).toDate()
            const empleado=await this.empleadoRepository.findByLegajo(id)
            let jornadas=null
            //verificamos que exista empleado y que estemos recibiendo la data a actualizar
            if (empleado && data){
                //buscamos el la jornada que queremos cargar, si existe entra y modifica 
                //sino nos va a lanzar un error
                jornadas=buscarFecha(empleado.jornada,moment(data[1]))
                if (jornadas && data[0]=="normal"&& (e instanceof Date && s instanceof Date != null) ){
                    jornadas.entrada=e;
                    jornadas.salida=s;
                    const resultado=await this.empleadoRepository.saveChangesJornada(empleado,jornadas,"Jornada normal cargada con exito!")
                    return resultado
                }
                if (jornadas && data[0]=="extra" && (e instanceof Date && s instanceof Date != null)){
                    jornadas.entrada_horas_extra=e;
                    jornadas.salida_horas_extra=s;
                    const resultado=await this.empleadoRepository.saveChangesJornada(empleado,jornadas,"Horas extra cargadas con exito!")
                    return resultado
                };
                if(jornadas && data[0]=="licencia"){
                    jornadas.licencia=data[2];
                    const resultado=await this.empleadoRepository.saveChangesJornada(empleado,jornadas,`licencia por ${data[2]}, se cargo con exito!`)
                    return resultado
                }
                
            }else{
               return ERROR
            };
        }catch(e){
            return ERROR
        }
    }
    //VER FICHADA DESDE HASTA
    public dateTodate=async(data:Date[],legajo:string)=>{
        try{
            const user=await this.empleadoRepository.dateToDate(data,legajo)
            return user
        }catch(e){
            return ERROR
        }
    }
    //BUSQUEDA
    public listBySearch=async(match:any)=>{
       try{
            const empleado=await this.empleadoRepository.listBySearch(match)
            return empleado
       }catch(e){   
            return ERROR
       }
            
    }
    //Habilitar al empleado para hacer horas extras
    public searchDayAndUpdate=async(legajo:string,fecha:Date)=>{
        try{

            const empleado=await this.empleadoRepository.findByLegajo(legajo);
            const jornada=buscarFecha(empleado.jornada,fecha);
            if (jornada){
                jornada.habilitado_horas_extra=true;
                const guardar=await this.empleadoRepository.saveChangesJornada(empleado,jornada,`Se habilitaron horas extra para el ${fecha}`);
                return guardar;
            }
        }catch(e){
            return ERROR
        }
    }
    //Activar o desactivar un empleado
    public activeUser=async(legajo:string,opcion:boolean)=>{
        try{
            const empleado=await this.empleadoRepository.findByLegajo2(legajo);
            if (empleado){
                empleado.activo=opcion;
                const guardar=await this.empleadoRepository.saveChangesJornada(empleado,null,"");
                return guardar;
            }
        }catch(e){
            return ERROR
        }
    }
    //Traer por legajo pero en info reducida
    public getByLegajo=async(legajo:string)=>{
        try{
            const empleado=await this.empleadoRepository.findByLegajo(legajo);
            if(empleado)return empleado;
        }catch{
            return ERROR;
        }
    }
    //Reporte quincenal
    public report=async()=>{
        try{
            const empleados=await this.empleadoRepository.report()
            const data=report(empleados)
            return data 
        }catch(e){
            return ERROR
        }
    }
    //Fichadas que se van generando en vivo
    public lastClock= async()=>{
        try{
            const ayer=moment().subtract(1, 'day').toDate();
            const hoy=moment().toDate();
            const data=await this.empleadoRepository.lastClock(ayer,hoy);
            return data
        }catch(e){
            return ERROR
        }
    }
    //Buscar por turno
    public rotation=async(turno:string)=>{
        try{
            const data=await this.empleadoRepository.listByRotation(turno);
            return data;
        }catch(e){
            return ERROR;
        }
    }
    //Buscar por sector
    public area=async(area:string)=>{
        try{
            const ayer=moment().subtract(1, 'day').toDate();
            const hoy=moment().toDate();
            const data=await this.empleadoRepository.listByArea(area,ayer,hoy);
            return data;
        }catch(e){
            return ERROR;
        }
    }
    public desdeHasta=async(area:string,body:Array<Date>)=>{
        try{
            if(body[0]&&body[1]){
                const desde=new Date(body[0])
                const hasta=new Date(body[1])
                const data=await this.empleadoRepository.dateToDateGeneral(area,desde,hasta)
                return data
            }else return ERROR
        }catch(e){
            return ERROR
        }
    }
    
}