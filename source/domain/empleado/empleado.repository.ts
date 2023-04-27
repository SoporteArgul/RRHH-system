import { EmpleadoEntity } from "./empleado.entity";



export interface EmpleadoRepository{
    
    //POST
    registerUser(user?:EmpleadoEntity):Promise<any>;
    login(email:string):Promise<any>;
    sendMail():Promise<any>;

    //GET
    listUser():Promise<any>;
    listByGroup(group:string):Promise<any>;
    listByRotation():Promise<any>;
    listByArea():Promise<any>;
    listBySearch():Promise<any>;
    dateToDate(data:Array<Date>):Promise<any>;
    
    //DELETE
    deleteUser(id:string):Promise<any>;

    //UPDATE
    clockingUser(empleadoId:string,data:Object):Promise<any>;
    updateExtraHours(id:string,data:Array<Date>):Promise<any>;
    updateUser(id:string,data:EmpleadoEntity):Promise<any>;
    
    
}