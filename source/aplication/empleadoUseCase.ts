import  { EmpleadoValue }  from '../domain/empleado/empleado.value';
import { EmpleadoRepository } from "../domain/empleado/empleado.repository"
import {Jornadas, Liquidacion} from "../domain/empleado/empleado.interface";
import moment from 'moment-timezone';
import buscarFecha from '../infrastructure/scripts/utils/buscar.fecha';
import "dotenv/config"
import resizeImage from '../infrastructure/storage/sharp';


const ERROR="Error, vuelva a intentar mas tarde"
export class EmpleadoUseCase{
    constructor(private readonly empleadoRepository:EmpleadoRepository){}
    
    //REGISTRAR USUARIO 
    public registerUser=async(imagePath:string,{ legajo, apellido, nombre, cuil, contratacion, fecha_ingreso, gerencia, area, sector, centro_de_costo, convenio, categoria, dni, fecha_nacimiento, sexo, email, telefono, telefono_urgencia, pais, provincia, ciudad, calle, numero, departamento, piso, codigo_postal, nivel_educacion, activo, fecha_egreso, estado_ambiental, examen_preocupacional, tipo_liquidacion, rotacion, turno, grupo, jornada, liquidacion, observaciones, foto}:{    legajo: string;
        apellido: string;
        nombre: string;
        cuil: string;
        contratacion: string;
        fecha_ingreso:Date
        gerencia: string;
        area: string;
        sector: string;
        centro_de_costo:string;
        convenio: string;
        categoria: string;
        dni: string;
        fecha_nacimiento:string;
        sexo: string;
        email: string;
        telefono: string;
        telefono_urgencia:string;
        pais:string;
        provincia:string;
        ciudad:string;
        calle:string;
        numero:string;
        departamento:string;
        piso:string;
        codigo_postal:string;
        nivel_educacion:string;
        activo: boolean;
        fecha_egreso:Date;
        estado_ambiental:string;
        examen_preocupacional:string;
        tipo_liquidacion:string;
        rotacion:string;
        turno:string;
        grupo:string;
        jornada: Jornadas[];
        liquidacion: Liquidacion[];
        observaciones: string;
        foto: string;})=>{
        try{
            resizeImage(imagePath)
            const host=process.env.APP_HOST;
            const port=process.env.PORT;
            imagePath=`${host}${port}/${imagePath}`;
            const userValue=new EmpleadoValue({ legajo, apellido, nombre, cuil, contratacion, fecha_ingreso, gerencia, area, sector, centro_de_costo, convenio, categoria, dni, fecha_nacimiento, sexo, email, telefono, telefono_urgencia, pais, provincia, ciudad, calle, numero, departamento, piso, codigo_postal, nivel_educacion, activo, fecha_egreso, estado_ambiental, examen_preocupacional, tipo_liquidacion, rotacion, turno, grupo, jornada, liquidacion, observaciones, foto:imagePath})
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
    
    public listByGroup=async(group:string)=>{
        try{
            const user=await this.empleadoRepository.listByGroup(group)
            return user
        }catch(e){
            return ERROR
        }
    }
    
    //MODIFICAR USUARIO
    public updateUser=async(id:string,imagePath:string,{ legajo, apellido, nombre, cuil, contratacion, fecha_ingreso, gerencia, area, sector, centro_de_costo, convenio, categoria, dni, fecha_nacimiento, sexo, email, telefono, telefono_urgencia, pais, provincia, ciudad, calle, numero, departamento, piso, codigo_postal, nivel_educacion, activo, fecha_egreso, estado_ambiental, examen_preocupacional, tipo_liquidacion, rotacion, turno, grupo, jornada, liquidacion, observaciones, foto}:{    legajo: string;
        apellido: string;
        nombre: string;
        cuil: string;
        contratacion: string;
        fecha_ingreso:Date
        gerencia: string;
        area: string;
        sector: string;
        centro_de_costo:string;
        convenio: string;
        categoria: string;
        dni: string;
        fecha_nacimiento:string;
        sexo: string;
        email: string;
        telefono: string;
        telefono_urgencia:string;
        pais:string;
        provincia:string;
        ciudad:string;
        calle:string;
        numero:string;
        departamento:string;
        piso:string;
        codigo_postal:string;
        nivel_educacion:string;
        activo: boolean;
        fecha_egreso:Date;
        estado_ambiental:string;
        examen_preocupacional:string;
        tipo_liquidacion:string;
        rotacion:string;
        turno:string;
        grupo:string;
        jornada: Jornadas[];
        liquidacion: Liquidacion[];
        observaciones: string;
        foto: string;})=>{
        try{
            if (imagePath!=""){
                resizeImage(imagePath)
                const host=process.env.APP_HOST;
                const port=process.env.PORT;
                imagePath=`${host}${port}/${imagePath}`;
                const userValue=new EmpleadoValue({ legajo, apellido, nombre, cuil, contratacion, fecha_ingreso, gerencia, area, sector, centro_de_costo, convenio, categoria, dni, fecha_nacimiento, sexo, email, telefono, telefono_urgencia, pais, provincia, ciudad, calle, numero, departamento, piso, codigo_postal, nivel_educacion, activo, fecha_egreso, estado_ambiental, examen_preocupacional, tipo_liquidacion, rotacion, turno, grupo, jornada, liquidacion, observaciones, foto:imagePath})
                const user=await this.empleadoRepository.updateUser(id,userValue)
                return user
            }else{
                const userValue=new EmpleadoValue({ legajo, apellido, nombre, cuil, contratacion, fecha_ingreso, gerencia, area, sector, centro_de_costo, convenio, categoria, dni, fecha_nacimiento, sexo, email, telefono, telefono_urgencia, pais, provincia, ciudad, calle, numero, departamento, piso, codigo_postal, nivel_educacion, activo, fecha_egreso, estado_ambiental, examen_preocupacional, tipo_liquidacion, rotacion, turno, grupo, jornada, liquidacion, observaciones, foto})
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
    public clockingUser=async(empleadoId:string,data:Array<string>)=>{
        try{
            moment.locale('es');
            moment.tz.setDefault('America/Argentina/Buenos_Aires');
            empleadoId=empleadoId.toString();
            const MOMENTO=["Mañana","Tarde","Noche"];
            const fechaActual=moment().format("YYYY-MM-DD").toString();
            const horaActual = new Date().toLocaleTimeString('es-AR', { hour12: false });
            const horaActualDate = moment(horaActual, 'LTS').toDate();
            let jornadas=null
            const empleado=await this.empleadoRepository.findByLegajo(empleadoId) //buscamos el empleado que queremos modificar
            if (empleado) {
                //verificamos que este el empleado
                jornadas=buscarFecha(empleado.jornada,fechaActual)
                if (jornadas && jornadas.suspendido==false && empleado.activo==true ){
                //ENTRADA
                if (jornadas.entrada==null && !jornadas.habilitado_horas_extra){
                    if (empleado.turno ==MOMENTO[0] && (horaActual>="05:00:00" && horaActual<="06:45:00")){  
                        jornadas.entrada=horaActualDate
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                    if (empleado.turno ==MOMENTO[1]&& (horaActual>="13:00:00" && horaActual<="14:45:00")){
                        jornadas.entrada=horaActualDate
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                    if (empleado.turno ==MOMENTO[2]&& (horaActual>="21:00:00"&& horaActual<="22:45:00")){
                        jornadas.entrada=horaActualDate
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                }else{
                    if(jornadas.entrada==null && jornadas.habilitado_horas_extra && jornadas.salida_horas_extra){
                        if (empleado.turno ==MOMENTO[0] && (horaActual>="05:00:00" && horaActual<="06:45:00")){ 
                            jornadas.entrada=horaActualDate
                            const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                            return resultado;
                        }
                        if (empleado.turno ==MOMENTO[1]&& (horaActual>="13:00:00" && horaActual<="14:45:00")){
                            jornadas.entrada=horaActualDate;
                            const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                            return resultado;
                        }
                        if (empleado.turno ==MOMENTO[2]&& (horaActual>="21:00:00"&& horaActual<="22:45:00")){
                            jornadas.entrada=horaActualDate;
                            const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                            return resultado;
                        }
                    }
                };
                //SALIDA
                if (jornadas.entrada != null && jornadas.salida==null){
                    if (empleado.turno==MOMENTO[0] && (horaActual>="14:00:00" && horaActual<="14:45:00")){
                        jornadas.salida=horaActualDate
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                    if (empleado.turno==MOMENTO[1] && (horaActual>="22:00:00" && horaActual<="22:45:00")){
                        jornadas.salida=horaActualDate
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                    if (empleado.turno==MOMENTO[2] && (horaActual>="06:00:00" && horaActual<="06:45:00")){
                        jornadas.salida=horaActualDate;
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                }
                //ENTRADA DESCANSO
                if(jornadas.entrada && jornadas.entrada_descanso==null){
                    if(empleado.turno==MOMENTO[0]&& (horaActual>="07:00:00"&&horaActual<="13:45:00")){
                        jornadas.entrada_descanso=horaActualDate;
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                    if(empleado.turno==MOMENTO[1]&&horaActual>="15:00:00"&&horaActual<="21:45:00"){
                        jornadas.entrada_descanso=horaActualDate;
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                    if(empleado.turno==MOMENTO[2]&&((horaActual>="23:00:00"&&horaActual<="23:59:59")||(horaActual>="00:00:00"&&horaActual<="05:45:00"))){
                        jornadas.entrada_descanso=horaActualDate;
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                }
                //SALIDA DESCANSO
                if(jornadas.entrada && jornadas.entrada_descanso && jornadas.salida_descanso==null){
                    const diffMins = Math.round((moment(horaActual,"HH:mm:ss").toDate().getTime()-jornadas.entrada_descanso.getTime()) / 60000);
                    if( diffMins >= 10){
                        if(empleado.turno==MOMENTO[0]&&horaActual>="07:25:00"&&horaActual<="13:55:00"){
                            const diffMinsRounded = Math.round((moment(horaActual, "HH:mm:ss").toDate().getTime() - jornadas.entrada_descanso.getTime()) / (1000 * 60 * 30));
                            if(diffMinsRounded>=31)jornadas.observaciones="descanso excedido!"
                            jornadas.salida_descanso=horaActualDate;
                            const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                            return resultado;
                        }
                        if(empleado.turno==MOMENTO[1]&&(horaActual>="15:25:00"&&horaActual<="21:55:00")){
                            const diffMinsRounded = Math.round((moment(horaActual, "HH:mm:ss").toDate().getTime() - jornadas.entrada_descanso.getTime()) / (1000 * 60 * 30));
                            if(diffMinsRounded>=31)jornadas.observaciones="descanso excedido!"

                            jornadas.salida_descanso=horaActualDate;
                            const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                            return resultado;
                        }
                        if(empleado.turno==MOMENTO[2]&&(horaActual>="23:25:00"&&horaActual<="23:59:00")||(horaActual>="00:00:00"&&horaActual<="05:35:00")){
                            const diffMinsRounded = Math.round((moment(horaActual, "HH:mm:ss").toDate().getTime() - jornadas.entrada_descanso.getTime()) / (1000 * 60 * 30));
                            if(diffMinsRounded>=31)jornadas.observaciones="descanso excedido!"
                            jornadas.salida_descanso=horaActualDate;
                            const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                            return resultado;
                        }
                    }else return "Debe esperar al menos 10 minutos para fichar nuevamente!"


                }
                //HORAS EXTRA ENTRADA
                if((jornadas.entrada && jornadas.salida) && jornadas.habilitado_horas_extra && jornadas.entrada_horas_extra==null && empleado.turno==MOMENTO[0] ){
                    if (horaActual>="14:00:00" && horaActual<="14:25:00" ){
                        jornadas.entrada_horas_extra=horaActualDate
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }}
                if((!jornadas.entrada&&!jornadas.salida) && jornadas.habilitado_horas_extra && (empleado.turno==MOMENTO[2]||empleado.turno==MOMENTO[1])){
                    if (empleado.turno==MOMENTO[1] && ( horaActual>="09:45:00" && horaActual<= "13:25:00")){
                        jornadas.entrada_horas_extra=horaActualDate                       
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                    if(empleado.turno==MOMENTO[2] && (horaActual>="17:45:00" && horaActual <= "21:25:00" )){
                        jornadas.entrada_horas_extra=horaActualDate;
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado);
                        return resultado; 
                    }}
                //HORAS EXTRA SALIDA
                if (jornadas.habilitado_horas_extra && jornadas.entrada_horas_extra &&  jornadas.salida_horas_extra==null){
                    if(empleado.turno==MOMENTO[1] && (horaActual>="11:00:00" && horaActual<="14:20:00") ){
                        jornadas.salida_horas_extra=horaActualDate;
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado);
                        return resultado;
                    }
                    if(empleado.turno==MOMENTO[0]&& (horaActual>="13:00:00" && horaActual<="18:45:00")){
                        jornadas.salida_horas_extra=horaActualDate
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    }
                    if(empleado.turno==MOMENTO[2]&& horaActual<="22:45:00"){
                        jornadas.salida_horas_extra=horaActualDate
                        const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                        return resultado;
                    } 
                }
                }else{
                    if(empleado.rotacion=="fijo" && jornadas){
                        if(jornadas.entrada==null && horaActual>="05:00:00" && horaActual<="20:00:00"){
                            jornadas.entrada=horaActualDate;
                            const resultado=await this.empleadoRepository.saveChangesJornada(empleado);
                            return resultado;
                        }
                        if(jornadas.entrada && horaActual>="14:00:00" && horaActual<="20:00:00"){
                            jornadas.salida=horaActualDate;
                            const resultado=await this.empleadoRepository.saveChangesJornada(empleado);
                            return resultado;
                        }
                    }
                }}
        }catch(e){
            return ERROR
        }}
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
                    const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                    return resultado
                }
                if (jornadas && data[0]=="extra" && (e instanceof Date && s instanceof Date != null)){
                    jornadas.entrada_horas_extra=e;
                    jornadas.salida_horas_extra=s;
                    const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
                    return resultado
                };
                if(jornadas && data[0]=="licencia"){
                    jornadas.licencia=data[2];
                    const resultado=await this.empleadoRepository.saveChangesJornada(empleado)
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
            let jornada=null;
            const empleado=await this.empleadoRepository.findByLegajo(legajo);
            jornada=buscarFecha(empleado.jornada,fecha);
            if (jornada){
                jornada.habilitado_horas_extra=true;
                const guardar=await this.empleadoRepository.saveChangesJornada(empleado);
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
                const guardar=await this.empleadoRepository.saveChangesJornada(empleado);
                return guardar;
            }
        }catch(e){
            return ERROR
        }
    }

    public getByLegajo=async(legajo:string)=>{
        try{
            const empleado=await this.empleadoRepository.findByLegajo(legajo);
            if(empleado)return empleado;
        }catch{
            return ERROR;
        }
    }

    
}