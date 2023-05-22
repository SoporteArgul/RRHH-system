import { EmpleadoEntity } from "../../domain/empleado/empleado.entity";
import { EmpleadoRepository } from "../../domain/empleado/empleado.repository";
import EmpleadoModel from "../model/empleado.model";
import generacion_calendario from "../scripts/utils/generacion.calendario.id"
import moment from "moment-timezone";
import generacion_liquidacion from"../scripts/utils/generacion.liquidacion.id"
import buscarFecha from "../scripts/utils/buscar.fecha";



export class MongoRepository implements EmpleadoRepository{
    async registerUser(imagePath:string,userIn:EmpleadoEntity):Promise<any>{
        try{
            const user= await EmpleadoModel.create(userIn)
            generacion_calendario(user._id.toString())
            generacion_liquidacion(user._id.toString())
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
    async listUser():Promise<any>{
        try{
            const user=await EmpleadoModel.find({},{jornada:0,liquidacion:0})
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
    async listBySearch(query:any): Promise<any> {
        try{
            const form= await EmpleadoModel.aggregate([{$match:query}])
            return form;
        }catch(e){
            console.log("Error, intente nuevamente o contacte al administrador!")
        }
    }
    async updateUser(legajo:string,update:EmpleadoEntity):Promise<any>{
        try{
            const user=await EmpleadoModel.findOneAndUpdate({ legajo: legajo },{ $set: update },{ new: true })
            return user
        }catch(e){
            console.log(e)
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
    async findByLegajo(legajo:string): Promise<any> {
        try{
            const empleado=await EmpleadoModel.findOne({legajo:legajo});
            return empleado
        }catch(e){
            console.log("Error de repositorio")
        }
        
    }
    async findByLegajo2(legajo:string): Promise<any> {
        try{
            const empleado=await EmpleadoModel.findOne({legajo:legajo},{jornada:0,liquidacion:0});
            return empleado
        }catch(e){
            console.log("Error de repositorio")
        }
        
    }
    async saveChangesJornada(empleado: any): Promise<any> {
        try{
            empleado.markModified('jornada')
            const resultado=await empleado.save()
            return resultado;
        }catch(e){
            console.log("error de repositorio")
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
                jornadas=buscarFecha(empleado.jornada,moment(data[1]))
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
    async dateToDate(data: Date[],legajo:string): Promise<any> {
        try{
            const fechaInicio=new Date(data[0]);
            const fechaFin=new Date(data[1]);
            const resultado=EmpleadoModel.aggregate([
                { $unwind: "$jornada" },
                { $unwind: "$jornada" },
                { $unwind: "$jornada" },
                { $match: { "jornada.fecha": { $gte: fechaInicio, $lte: fechaFin } } },
                { $match: { "legajo": legajo } },
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
    async updateDailyHours(): Promise<any> {
        try{
            const empleado=await EmpleadoModel.find({rotacion:"6x1"})
            const fecha_ayer=moment().subtract(1,"days").format('l').toString();
            if (empleado){
                let jornadas=null
                for (const emp of empleado){            
                    for (const jornada of emp.jornada) {
                        jornadas = jornada.flat().find((j:any) => moment(j.fecha).format('l') === fecha_ayer);
                    };
                    const hora_entrada=moment(jornadas?.entrada).hours();
                    const hora_salida=moment(jornadas?.salida).hours();
                    const hora_entrada_extra=moment(jornadas?.entrada_horas_extra).hours();
                    const hora_salida_extra=moment(jornadas?.salida_horas_extra).hours();
                    if(jornadas){
                        //Turno mañana
                        if (emp.turno=="mañana"){
                            //Calculo de la jornada normal
                            if(hora_entrada==6 && hora_salida==14){
                                if (jornadas.feriado)jornadas.horas_diurnas_100+=8  
                                else jornadas.horas_diurnas+=8
                            }               
                            //Calculo de las horas extra 
                            if (hora_entrada_extra==14 ){
                                if(jornadas?.feriado){
                                    if(hora_salida_extra==15)jornadas.horas_diurnas_100+=1;
                                    if(hora_salida_extra==16)jornadas.horas_diurnas_100+=2;
                                    if(hora_salida_extra==17)jornadas.horas_diurnas_100+=3;
                                    if(hora_salida_extra==18)jornadas.horas_diurnas_100+=4;
                                }else{
                                    if(hora_salida_extra==15)jornadas.horas_diurnas_50+=1;
                                    if(hora_salida_extra==16)jornadas.horas_diurnas_50+=2;
                                    if(hora_salida_extra==17)jornadas.horas_diurnas_50+=3;
                                    if(hora_salida_extra==18)jornadas.horas_diurnas_50+=4;
                                }       
                            }  
                        }
                        //Turno tarde
                        if (emp.turno=="tarde"){
                            //Jornada comun
                            if (hora_entrada==14 && hora_salida==22){
                                if (jornadas.feriado)jornadas.horas_diurnas_100+=7,jornadas.horas_nocturnas_100+=1
                                else jornadas.horas_diurnas+=7,jornadas.horas_nocturnas+=1
                            }
                            //Jornada extra
                            if (hora_salida_extra==14 ){
                                if(jornadas?.feriado){
                                    if(hora_entrada_extra==10)jornadas.horas_diurnas_100+=4;
                                    if(hora_entrada_extra==11)jornadas.horas_diurnas_100+=3;
                                    if(hora_entrada_extra==12)jornadas.horas_diurnas_100+=2;
                                    if(hora_entrada_extra==13)jornadas.horas_diurnas_100+=1;
                                }else{
                                    if(hora_entrada_extra==10)jornadas.horas_diurnas_50+=4;
                                    if(hora_entrada_extra==11)jornadas.horas_diurnas_50+=3;
                                    if(hora_entrada_extra==12)jornadas.horas_diurnas_50+=2;
                                    if(hora_entrada_extra==13)jornadas.horas_diurnas_50+=1;
                                }       
                            }  
                        }
                        //Turno noche
                        if (emp.turno=="noche"){
                            //Jornada comun
                            if (hora_entrada==22 && hora_salida==6){
                                if (jornadas.feriado)jornadas.horas_nocturnas_100+=6,jornadas.horas_nocturnas+=2
                                else jornadas.horas_nocturnas+=8
                            }
                            //Jornada extra
                            if (hora_salida_extra==22 ){
                                if(jornadas?.feriado){
                                    if(hora_entrada_extra==18)jornadas.horas_diurnas_100+=4;
                                    if(hora_entrada_extra==19)jornadas.horas_diurnas_100+=3;
                                    if(hora_entrada_extra==20)jornadas.horas_diurnas_100+=2;
                                    if(hora_entrada_extra==21)jornadas.horas_diurnas_100+=1;
                                }else{
                                    if(hora_entrada_extra==18)jornadas.horas_diurnas_50+=4;
                                    if(hora_entrada_extra==19)jornadas.horas_diurnas_50+=3;
                                    if(hora_entrada_extra==20)jornadas.horas_diurnas_50+=2;
                                    if(hora_entrada_extra==21)jornadas.horas_diurnas_50+=1;
                                }       
                            }  
                        }
                        emp.markModified("jornada")
                        const resultado=await emp.save()   
                        
                }
                

            }
        }
  
        }catch(e){
            console.log("error")
        }
    }
    async report(): Promise<any> {
        const hoy = moment().date(15);
        let fechaInicio, fechaFin:any;
        
        if (hoy <= moment().date(15)) {
          // Hoy es 1-15 del mes
          fechaInicio = moment().date(1).toDate();
          fechaFin = moment().date(15).toDate();
        } else {
          // Hoy es 16-fin de mes
          fechaInicio = moment().date(16).toDate();
          fechaFin = moment().endOf('month').toDate();
        }
        const empleados=await EmpleadoModel.aggregate([
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
                jornada: { $push: "$jornada" },
                total_horas_trabajadas:{$first:"$total_horas_trabajadas"}
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
          return empleados
        
        
    }

}
    
