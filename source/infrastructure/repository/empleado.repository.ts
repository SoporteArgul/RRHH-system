import { EmpleadoEntity } from "../../domain/empleado/empleado.entity";
import { EmpleadoRepository } from "../../domain/empleado/empleado.repository";
import EmpleadoModel from "../model/empleado.model";
import tarea from "../scripts/jornada.nueva"
import moment from "moment-timezone";
import tarea2 from"../scripts/jornal.script"
export class MongoRepository implements EmpleadoRepository{
    
    async findUserById(uuid:string):Promise<any>{
        try{
            const user= await EmpleadoModel.findOne({uuid});
            return user
        }catch(e){
            console.log("Error de repositorio")
        }
    }
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
    async listUser():Promise<any>{
        try{
            const user=await EmpleadoModel.find()
            return user 
        }catch(e){
            console.log("Error de repositorio")
        }
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
    async login(email:string):Promise<any>{
        try{
            const user= await EmpleadoModel.findOne({email})
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
            const horaActual = moment().format('LTS')
            const horaActualDate = moment(horaActual, 'LTS').toDate();
            const empleado=await EmpleadoModel.findById(empleadoId); //buscamos el empleado que queremos modificar
            if (empleado) {//verificamos que este el empleado
                const jornadas = empleado.jornada.find((j) => moment(j.fecha).format('l') === fechaActual) // Buscar una jornada correspondiente a la fecha actual
                if (jornadas&& data[0] == "jornada") {//chequeamos que la jornada exista
                  if (data[1]=="entrada"){ //modificamos la jornada actual
                    jornadas.entrada = horaActualDate;
                    //utilizamos markmodified para modificar el modelo
                    empleado.markModified('jornada');
                    const resultado = await empleado.save();
                    return resultado;
                  };
                  if (data[1]=="salida"){
                    jornadas.salida = horaActualDate;
                    empleado.markModified('jornada');
                    const resultado = await empleado.save();
                    return resultado;
                  };
                  
                }else{
                    if (jornadas&& data[0] == "extra") {//chequeamos que la jornada exista
                        if (data[1]=="entrada"){ //modificamos la jornada actual
                          jornadas.entrada_horas_extra = horaActualDate;
                          //utilizamos markmodified para modificar el modelo
                          empleado.markModified('jornada');
                          const resultado = await empleado.save();
                          return resultado;
                        };
                        if (data[1]=="salida"){
                          jornadas.salida_horas_extra = horaActualDate;
                          empleado.markModified('jornada');
                          const resultado = await empleado.save();
                          return resultado;
                        };
                    }else{
                        throw new Error("No se ha registrado la fichada")
                    }
                }
            }else{
                console.log("No se encontró el empleado con el ID proporcionado");
            }
    
        }catch(e){
            console.log(e)
            console.log("Error de repositorio")
        }
        
    }

    async clockingUserExtra(_id:string,data:Array<string>): Promise<any> {
        try{

        
            const fechaActual=moment().format('l').toString();
            const horaActual = moment().format('LTS')
            const horaActualDate = moment(horaActual, 'LTS').toDate();
            //buscamos el empleado que queremos modificar
            const empleado=await EmpleadoModel.findById({_id});
            //verificamos que este el empleado
            if (empleado) {
                // Buscar una jornada correspondiente a la fecha actual
                const jornadas = empleado.jornada.find((j) => moment(j.fecha).format('l') === fechaActual);
                console.log(jornadas)
                //chequeamos que la jornada exista
                if (jornadas && jornadas.habilitado_horas_extra==true) {
                  //modificamos la jornada actual
                  if (data[0]=="entrada"){
                    jornadas.entrada_horas_extra = horaActualDate;
                    //utilizamos markmodified para modificar el modelo
                    empleado.markModified('jornada');
                    const resultado = await empleado.save();
                    return resultado;
                }
                  if (data[0]=="salida"){
                    jornadas.salida_horas_extra = horaActualDate;
                    empleado.markModified('jornada');
                    const resultado = await empleado.save();
                    return resultado;
                  }
                } else {
                  throw new Error('No se pudo actualizar')
                }  
            }else{
                console.log("No se encontró el empleado con el ID proporcionado");
            }
    
        }catch(e){
            console.log(e)
            console.log("Error de repositorio")
        }}

    async updateExtraHours(id: string, data:Array<Date|string>): Promise<any> {
        try{
            //esta va a ser una funcionalidad para los administradores donde van a poder cargar 
            //jornadas y horas extras que no se hayan cargado
            const e=moment(data[2]).toDate()
            const s=moment(data[3]).toDate()
            const empleado=await EmpleadoModel.findOne({_id:id})
            //verificamos que exista empleado y que estemos recibiendo la data a actualizar
            if (empleado && data){
                //buscamos el la jornada que queremos cargar, si existe entra y modifica 
                //sino nos va a lanzar un error
                const jornada = empleado.jornada.find((dia) => moment(dia.fecha).isSame(moment(data[1]), 'day'))
                if (jornada && data[0]=="normal"&& (e instanceof Date && s instanceof Date != null) ){
                    jornada.entrada=e;
                    jornada.salida=s;
                    empleado.markModified('jornada');
                    const resultado=await empleado.save();
                    return resultado
                }else{
                    if (jornada && data[0]=="extra" && (e instanceof Date && s instanceof Date != null)){
                        jornada.entrada_horas_extra=e;
                        jornada.salida_horas_extra=s;
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
                { $match: { "jornada.fecha": { $gte: fechaInicio, $lt: fechaFin } } },
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
    
