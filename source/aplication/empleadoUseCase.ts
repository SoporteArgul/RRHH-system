import  { EmpleadoValue }  from '../domain/empleado/empleado.value';
import { EmpleadoRepository } from "../domain/empleado/empleado.repository"
import {Jornadas, Liquidacion} from "../domain/empleado/empleado.interface";
import moment from 'moment-timezone';
import buscarFecha from '../infrastructure/scripts/utils/buscar.fecha';
import "dotenv/config"
import resizeImage from '../infrastructure/storage/sharp';
import writeExcelFile from 'write-excel-file/node'


const ERROR="Error, vuelva a intentar mas tarde"
export class EmpleadoUseCase{
    constructor(private readonly empleadoRepository:EmpleadoRepository){}
    
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
            const MOMENTO=["Mañana","Tarde","Noche"];
            const fechaActual=moment().format("YYYY-MM-DD").toString();
            // const horaActual = new Date().toLocaleTimeString('es-AR', { hour12: false });
            const horaActual="16:01:00"
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
                    if (empleado.turno==MOMENTO[2]&& (horaActual>="21:00:00"&& horaActual<="22:45:00")){
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
            let HEADER_ROWS=[
                {value:"Legajo",fontWeight: 'bold'},
                {value:"Nombre",fontWeight: 'bold'},
                {value:"Fecha",fontWeight: 'bold'},
                {value:"Hora Ingreso esperado",fontWeight: 'bold'},
                {value:"Hora Egreso esperado",fontWeight: 'bold'},
                {value:"Hora Ingreso",fontWeight: 'bold'},
                {value:"Hora Egreso",fontWeight: 'bold'},
                {value:"Hs Diurna",fontWeight: 'bold'},
                {value:"Hs Nocturna",fontWeight: 'bold'},
                {value:"Observaciones",fontWeight: 'bold'},
                {value:"Diurna Feriado",fontWeight: 'bold'},
                {value:"Nocturna Feriado",fontWeight: 'bold'},
                {value:"HHEE Diurna 50%",fontWeight: 'bold'},
                {value:"HHEE Nocturna 50%",fontWeight: 'bold'},
                {value:"HHEE Diurna 100%",fontWeight: 'bold'},
                {value:"HHEE Nocturna 100%",fontWeight: 'bold'},
                {value:"Diurna Enfermedad",fontWeight: 'bold'},
                {value:"Nocturna Enfermedad",fontWeight: 'bold'},
                {value:"Licencia Gremial",fontWeight: 'bold'},
                {value:"Diurna Feriado Ley",fontWeight: 'bold'},
                {value:"Accidente",fontWeight: 'bold'},
                {value:"Vacaciones",fontWeight: 'bold'},
                {value:"Licencia Maternidad",fontWeight: 'bold'},
                {value:"Licencia Mudanza",fontWeight: 'bold'},
                {value:"Licencia Nacimiento",fontWeight: 'bold'},
                {value:"Ausente con Aviso",fontWeight: 'bold'},
                {value:"Ausente sin Aviso",fontWeight: 'bold'},
                {value:"Licencia Examen",fontWeight: 'bold'},
                {value:"Suspension",fontWeight: 'bold'},
                {value:"Licencia Fallecimiento",fontWeight: 'bold'},
                {value:"Licencia Matrimonio",fontWeight: 'bold'},
                {value:"Licencia Donacion de Sangre",fontWeight: 'bold'},
                {value:"Ausencia Enfermedad Injustificada",fontWeight: 'bold'},
                {value:"Diurna Reserva Legal de Puesto",fontWeight: 'bold'},
                {value:"Nocturna Reserva Legal de Puesto",fontWeight: 'bold'},
                {value:"Licencia Aislamiento",fontWeight: 'bold'},
                {value:"Licencia Vacunacion COVID",fontWeight: 'bold'},
              ];
                  
              let ing_esperado="";
              let egr_esperado="";
              let data:Array<Array<Object>>=[]
              data.push(HEADER_ROWS)
              empleados.forEach((empleado:any)=>{
              empleado.jornada.forEach((emp:any)=>{
                  if (moment(emp.entrada).hours()==6)ing_esperado="06:00:00",egr_esperado="14:00:00";
                  if (moment(emp.entrada).hours()==14)ing_esperado="14:00:00",egr_esperado="22:00:00";
                  if (moment(emp.entrada).hours()==22)ing_esperado="22:00:00",egr_esperado="14:00:00";
                  if (emp.entrada==null)ing_esperado="00:00:00",egr_esperado="00:00:00";
                  let entrada;
                  let salida;      
                  let licencia=0;
                  if (emp.entrada!=null)entrada = new Date(emp.entrada.getTime() - (3 * 60 * 60 * 1000)); // Resta 3 horas
                  if(emp.salida!=null)salida = new Date(emp.salida.getTime() - (3 * 60 * 60 * 1000));
                  let DATA_ROW=[{type:String,value:empleado.legajo, alignVertical:"center"},
                                {type:String,value:empleado.nombre.concat(empleado.apellido)},
                                {type:Date,value:emp.fecha,format: 'yyyy-mm-dd'},
                                {type:String,value:ing_esperado},
                                {type:String,value:egr_esperado},
                                {type:Date,value:entrada,format: 'hh:mm:ss'},
                                {type:Date,value:salida,format: 'hh:mm:ss'},
                                {type:Number,value:emp.horas_diurnas},
                                {type:Number,value:emp.horas_nocturnas},
                                {type:String,value:emp.observaciones},
                                {type:Number,value:emp.horas_diurnas_100},
                                {type:Number,value:emp.horas_nocturnas_100},
                                {type:Number,value:emp.horas_diurnas_50},
                                {type:Number,value:emp.horas_nocturnas_50},
                                {type:Number,value:emp.horas_diurnas_100},
                                {type:Number,value:emp.horas_nocturnas_100},
                                {type:Number,value:licencia},
                                {type:Number,value:licencia},
                                {type:Number,value:licencia},
                                {type:Number,value:licencia},
                                {type:Number,value:licencia},
                                {type:Number,value:licencia},
                                {type:Number,value:licencia},
                                {type:Number,value:licencia},
                                {type:Number,value:licencia},
                                {type:Number,value:licencia},
                                {type:Number,value:licencia},
                                {type:Number,value:licencia},
                                {type:Number,value:licencia},
                                {type:Number,value:licencia},
                                {type:Number,value:licencia},
                                {type:Number,value:licencia},
                                {type:Number,value:licencia},
                                {type:Number,value:licencia},
                                {type:Number,value:licencia},
                                {type:Number,value:licencia},
                                {type:Number,value:licencia},
                                {type:Number,value:licencia},
                                {type:Number,value:licencia},
                              ]
                  data.push(DATA_ROW)
              })
              })
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
    
}