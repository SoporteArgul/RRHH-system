import { EmpleadoEntity } from "../../domain/empleado/empleado.entity";
import { EmpleadoRepository } from "../../domain/empleado/empleado.repository";
import EmpleadoModel from "../model/empleado.model";
import tarea from "../scripts/jornada.nueva"
import moment from "moment-timezone";
import tarea2 from"../scripts/jornal.script"
export class MongoRepository implements EmpleadoRepository{
    

    async registerUser(userIn:EmpleadoEntity):Promise<any>{
        try{
            const user= await EmpleadoModel.create(userIn)
            tarea(user._id.toString())
            tarea2(user._id.toString())

            return user
        }catch(e){
            console.log(e)
            console.log("Error de repositorio")
        }
    }
    async login(email:string):Promise<any>{
        try{
            const user= await EmpleadoModel.findOne({email})
            return user
        }catch(e){
            console.log("Error de repositorio")
        }
    }
    async listUser():Promise<any>{
        try{
            const user=await EmpleadoModel.find()
            return user 
        }catch(e){
            console.log("Error de repositorio")
        }
    }
    async sendMail(): Promise<any> {
    }
    async listByGroup(data:string): Promise<any> {
        try{
            const user=await EmpleadoModel.find({grupo:data});
            return user
        }catch(e){
            throw Error("Error de repositorio")
        }
    }
    async listByArea(): Promise<any> {
        
    }
    async listByRotation(): Promise<any> {
        
    }
    async listBySearch(): Promise<any> {
        
    }
    async updateUser(id:string,update:EmpleadoEntity):Promise<any>{
        try{
            const user=await EmpleadoModel.findByIdAndUpdate(id,update)
            return user
        }catch(e){
            console.log("Error de repositorio")
        }
    }
    async deleteUser(id: string): Promise<any> {
        try{
            const user= await EmpleadoModel.findByIdAndDelete(id)    
            return user 
        }catch(e){
            console.log("Error de repositorio")
        }
    }
    
   
    async clockingUser(empleadoId:string,data:Array<string>): Promise<any> {
        try{
            moment.locale('es');
            moment.tz.setDefault('America/Argentina/Buenos_Aires');
            empleadoId=empleadoId.toString();
            const fechaActual=moment().format('l').toString();
            const horaActual = "18:10:15"
            const horaActualDate = moment(horaActual, 'LTS').toDate();
            let jornadas=null
            const empleado=await EmpleadoModel.findOne({_id:empleadoId}); //buscamos el empleado que queremos modificar
            const hora_salida_mañana="14:00:00"
            const hora_entrada_mañana="05:10:00"
            if (empleado) {//verificamos que este el empleado
               
                for (const jornada of empleado.jornada) {
                    jornadas = jornada.flat().find((j) => moment(j.fecha).format('l') === fechaActual);
                };
                if (jornadas){
                //ENTRADA
                //verificamos si no existe una entrada y luego nos fijamos que el horario sea menor
                if (jornadas.entrada==null){
                    console.log("entre")
                    if (empleado.turno =="mañana" && (horaActual>="05:00:00" && horaActual<="06:06:00")){
                        jornadas.entrada=horaActualDate
                        empleado.markModified('jornada')
                        const resultado=await empleado.save()
                        return resultado;
                    }
                    if (empleado.turno =="tarde"&& (horaActual>="13:00:00" && horaActual<="14:06:00")){
                        jornadas.entrada=horaActualDate
                        empleado.markModified('jornada')
                        const resultado=await empleado.save()
                        return resultado
                    }
                    if (empleado.turno =="noche"&& (horaActual>="21:00:00"&& horaActual<="22:05:00")){
                        jornadas.entrada=horaActualDate
                        empleado.markModified('jornada')
                        const resultado=await empleado.save()
                        return resultado
                    }
                };

                //SALIDA
                //verificamos los ragos horarios y luego fijamos el horario de salida
                if (jornadas.entrada != null && jornadas.salida==null){
                    if (empleado.turno=="mañana" && (horaActual>="14:00:00" && horaActual<="14:45:00")){
                        jornadas.salida=horaActualDate
                        empleado.markModified('jornada')
                        const resultado=await empleado.save()
                        return resultado
                    }
                    if (empleado.turno=="tarde" && (horaActual>="22:00:00" && horaActual<="22:45:00")){
                        jornadas.salida=horaActualDate
                        empleado.markModified('jornada')
                        const resultado=await empleado.save()
                        return resultado
                    }
                    if (empleado.turno=="noche" && (horaActual>="06:00:00" && horaActual<="06:45:00")){
                        jornadas.salida=horaActualDate
                        empleado.markModified('jornada')
                        const resultado=await empleado.save()
                        return resultado
                    }
                }


                //HORAS EXTRA ENTRADA
                if((jornadas.entrada && jornadas.salida) && jornadas.habilitado_horas_extra && jornadas.entrada_horas_extra==null && empleado.turno=="mañana" ){

                    if (horaActual>="14:00" && horaActual<="14:20" ){
                        jornadas.entrada_horas_extra=horaActualDate
                        empleado.markModified('jornada')
                        const resultado=await empleado.save()
                        return resultado
                    }}

                if((!jornadas.entrada&&!jornadas.salida) && jornadas.habilitado_horas_extra && (empleado.turno=="noche"||empleado.turno=="tarde")){
              
                    if (empleado.turno=="tarde" && ( horaActual>="9:45" && horaActual<= "13:05" )){
                        jornadas.entrada_horas_extra=horaActualDate
                        empleado.markModified('jornada')
                        const resultado=await empleado.save()
                        return resultado
                    }
                    if(empleado.turno=="noche" && (horaActual>="17:45" && horaActual <= "21:05" )){
                        jornadas.entrada_horas_extra=horaActualDate
                        empleado.markModified('jornada')
                        const resultado=await empleado.save()
                        return resultado 
                    }
                }
                //HORAS EXTRA SALIDA


                if (jornadas.habilitado_horas_extra && jornadas.entrada_horas_extra &&  jornadas.salida_horas_extra==null){
                   
                    if(empleado.turno=="tarde"&& (horaActual>="11:00" && horaActual<="14:45") ){
                        jornadas.salida_horas_extra=horaActualDate
                        empleado.markModified("jornada")
                        const resultado=await empleado.save()
                        return resultado
                    }
                    if(empleado.turno=="mañana"&& (horaActual>="13:00" && horaActual<="18:45")){
                        jornadas.salida_horas_extra=horaActualDate
                        empleado.markModified("jornada")
                        const resultado=await empleado.save()
                        return resultado
                    }
                    if(empleado.turno=="noche"&& horaActual<="22:45"){
                        jornadas.salida_horas_extra=horaActualDate
                        empleado.markModified("jornada")
                        const resultado=await empleado.save()
                        return resultado
                    }

                }
                }}
    
        }catch(e){
            console.log(e)
            console.log("Error de repositorio")
        }
        
    }



    async updateExtraHours(id: string, data:Array<Date|string>): Promise<any> {
        try{
            //esta va a ser una funcionalidad para los administradores donde van a poder cargar 
            //jornadas y horas extras que no se hayan cargado
            const e=moment(data[2]).toDate()
            const s=moment(data[3]).toDate()
            const empleado=await EmpleadoModel.findOne({_id:id})
            let jornadas=null
            //verificamos que exista empleado y que estemos recibiendo la data a actualizar
            if (empleado && data){
                //buscamos el la jornada que queremos cargar, si existe entra y modifica 
                //sino nos va a lanzar un error
                for (const jornada of empleado.jornada) {
                    jornadas = jornada.flat().find((dia) => moment(dia.fecha).isSame(moment(data[1]), 'day'))
                };
                
                if (jornadas && data[0]=="normal"&& (e instanceof Date && s instanceof Date != null) ){
                    jornadas.entrada=e;
                    jornadas.salida=s;
                    empleado.markModified('jornada');
                    const resultado=await empleado.save();
                    return resultado
                }else{
                    if (jornadas && data[0]=="extra" && (e instanceof Date && s instanceof Date != null)){
                        jornadas.entrada_horas_extra=e;
                        jornadas.salida_horas_extra=s;
                        empleado.markModified('jornada');
                        const resultado=await empleado.save();
                        return resultado;
                    };
                };
            }else{
                throw new Error("No se pudo modificar el usuario")
            };
        }catch(e){
            console.log(e)
            console.log("Error de repositorio")
        }
    }
    async dateToDate(data: Date[]): Promise<any> {
        try{
            const fechaInicio=new Date(data[0]);
            const fechaFin=new Date(data[1]);
            const resultado=EmpleadoModel.aggregate([
                
                { $unwind: "$jornada" },
                { $unwind: "$jornada" },
                { $unwind: "$jornada" },
                { $match: { "jornada.fecha": { $gte: fechaInicio, $lte: fechaFin } } },
                { $match: { "rotacion": "6x1" } },
                {
                  $group: {
                    _id: "$_id",
                    nombre: { $first: "$nombre" },
                    apellido: { $first: "$apellido" },
                    edad: { $first: "$edad" },
                    legajo: { $first: "$legajo" },
                    email: { $first: "$email" },
                    liquidacion_mensual: { $first: "$liquidacion_mensual" },
                    liquidacion_jornal: { $first: "$liquidacion_jornal" },
                    rotacion: { $first: "$rotacion" },
                    grupo: { $first: "$grupo" },
                    jornada: { $push: "$jornada" }
                  }
                },
                {
                  $project: {
                    _id: 1,
                    nombre: 1,
                    apellido: 1,
                    edad: 1,
                    legajo: 1,
                    email: 1,
                    liquidacion_mensual: 1,
                    liquidacion_jornal: 1,
                    jornada:1,
                    rotacion: 1,
                    grupo: 1,
                    total_horas_trabajadas: 1
                  }
                }
              ]);
              return resultado
        }catch(e){
            console.log("error de repositorio")
        }
    }
}
    
