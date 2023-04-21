import { EmpleadoEntity } from "./empleado.entity";
import { EmpleadoValue } from "./empleado.value";
import { Response } from "express";

export interface EmpleadoRepository{
    findUserById(uuid:string):Promise<any>;
    // findUserBySearch(keyword:string):Promise<any>
    registerUser(user?:EmpleadoEntity):Promise<any>;
    listUser():Promise<any>;
    updateUser(id:string,data:EmpleadoEntity):Promise<any>;
    deleteUser(id:string):Promise<any>
    clockingUser(empleadoId:string,data:Object):Promise<any>;
    clockingUserExtra(empleadoId:string,data:Object):Promise<any>;
    updateExtraHours(id:string,data:Array<Date>):Promise<any>;
    dateToDate(data:Array<Date>):Promise<any>
    login(email:string):Promise<any>;
}