import { EmpleadoEntity } from "./empleado.entity";



export interface EmpleadoRepository{
    
    //POST
    registerUser(imagePath:string,user?:EmpleadoEntity):Promise<any>;
    login(email:string):Promise<any>;
    sendMail():Promise<any>;

    //GET
    listUser():Promise<any>;
    listByGroup(group:string):Promise<any>;
    listByRotation():Promise<any>;
    listByArea():Promise<any>;
    listBySearch(query:Array<JSON>):Promise<any>;
    dateToDate(data:Array<Date>,legajo:string):Promise<any>;
    report():Promise<any>;
    findByLegajo(legajo:string):Promise<any>;
    findByLegajo2(legajo:string):Promise<any>;
    //DELETE
    deleteUser(id:string):Promise<any>;

    //UPDATE
    saveChangesJornada(jornadas:any):Promise<any>;
    updateExtraHours(id:string,data:Array<Date>):Promise<any>;
    updateDailyHours():Promise<any>;
    updateUser(id:string,data:EmpleadoEntity):Promise<any>;
    
    
}