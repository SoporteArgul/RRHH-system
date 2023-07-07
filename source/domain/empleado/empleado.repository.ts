import { EmpleadoEntity } from "./empleado.entity";

export interface EmpleadoRepository{
    
    //POST
    registerUser(imagePath:string,user?:EmpleadoEntity):Promise<any>;
    login(email:string):Promise<any>;
    //GET
    listUser():Promise<any>;
    listByGroup(group:string):Promise<any>;
    listByRotation(turno:string):Promise<any>;
    listByArea(area:string,ayer:Date,hoy:Date):Promise<any>;
    listBySearch(query:Array<JSON>):Promise<any>;
    dateToDate(data:Array<Date>,legajo:string):Promise<any>;
    dateToDateGeneral(area:string,desde:Date,hasta:Date):Promise<any>;
    report():Promise<any>;
    findByLegajo(legajo:string):Promise<any>;
    findByLegajo2(legajo:string):Promise<any>;
    findJornada(legajo:string):Promise<any>;
    lastClock(ayer:Date,hoy:Date):Promise<any>;
    //DELETE
    deleteUser(id:string):Promise<any>;
    //PUT
    saveChangesJornada(empleado:any,jornada:any,mag:string):Promise<any>;
    updateUser(id:string,data:EmpleadoEntity):Promise<any>;
    updateJornada(legajo:string,jornada:any,fecha:Date,valor:string):Promise<any>;
    
    
}