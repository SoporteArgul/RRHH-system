import { User } from './../../domain/usuario/usuario.entity';
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
    async listByArea(area:string,ayer:Date,hoy:Date): Promise<any> {
        try{
            const data = await EmpleadoModel.aggregate([
                { $unwind: "$jornada" },
                { $unwind: "$jornada" },
                { $unwind: "$jornada" },
                { $match: { area:area} },
                { $match: { "jornada.fecha": { $gte: new Date(ayer), $lte: hoy } } },
                {
                    $group: {
                        _id: "$_id",
                        nombre: { $first: "$nombre" },
                        apellido: { $first: "$apellido" },
                        legajo: { $first: "$legajo" },
                        jornada: { $push: "$jornada" },
                        turno:{ $first:"$turno"},
                        foto:{ $first:"$foto"}
                    }
                },
                {
                    $project: {
                        _id: 1,
                        nombre: 1,
                        apellido: 1,
                        legajo: 1,
                        jornada: 1,
                        turno:1,
                        foto:1
                    }
                },
                { 
                    $sort: { apellido: 1, turno:1 } 
                }
            ]);
            return data
        }catch(e){
            throw Error("Error de repositorio")
        }
    }
    async listByRotation(turno:string): Promise<any> {
        try{
            const data=await EmpleadoModel.find({turno:turno})
            return data
        }catch(e){
            throw Error("Error de repositorio")
        }
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
 
    async report(): Promise<any> {
        try{
            const hoy = moment().date(15);
            let fechaInicio, fechaFin:any;
            if (hoy <= moment().date(15)) {
                fechaInicio = moment().date(0).toDate();
                fechaFin = moment().date(15).toDate();
            }else {
                fechaInicio = moment().date(15).toDate();
                fechaFin = moment().endOf('month').toDate();
            }
            const empleados=await EmpleadoModel.aggregate([
                  { $unwind: "$jornada" },
                  { $unwind: "$jornada" },
                  { $unwind: "$jornada" },
                  { $match: { "jornada.fecha": { $gte: fechaInicio, $lte: fechaFin } } },
                  { $match: { "tipo_liquidacion": { $in: ["jornal", "jornal nacion"] }  } },
                  {
                    $group: {
                      _id: "$_id",
                      nombre: { $first: "$nombre" },
                      apellido: { $first: "$apellido" },
                      legajo: { $first: "$legajo" },
                      tipo_liquidacion:{ $first:"$tipo_liquidacion"},
                      jornada: { $push: "$jornada" },
                    }
                  },
                  {
                    $project: {
                      _id: 1,
                      nombre: 1,
                      apellido: 1,
                      legajo: 1,
                      tipo_liquidacion:1,
                      jornada:1,
                    }
                  },
                  { $sort: { legajo: 1 } }
                ]);
                return empleados
        }catch(e){
            return new Error("Error de repositorio")
        } 
    }
    async lastClock(ayer:Date,hoy:Date): Promise<any> {
        try{
            const data = await EmpleadoModel.aggregate([
                { $unwind: "$jornada" },
                { $unwind: "$jornada" },
                { $unwind: "$jornada" },
                { $match: { "jornada.fecha": { $gte: new Date(ayer), $lte: hoy } } },
                {
                    $group: {
                        _id: "$_id",
                        nombre: { $first: "$nombre" },
                        apellido: { $first: "$apellido" },
                        legajo: { $first: "$legajo" },
                        jornada: { $push: "$jornada" },
                        foto:{ $first:"$foto"}
                    }
                },
                {
                    $project: {
                        _id: 1,
                        nombre: 1,
                        apellido: 1,
                        legajo: 1,
                        jornada: 1,
                        foto:1
                    }
                },
                { 
                    $sort: { apellido: 1 } 
                }
            ]);
            return data;
        }catch(e){
            return new Error("Error de repositorio");
        }
    }

}
    
